import XLSX from 'xlsx'
import axios from 'axios'
/** ================ FUNCTIONS INDEX ================
 * 
 * 1. XLSM FILE PARSER
 * 2. WEEK PICKER
 * 3. DAY PICKER
 * 4. COLUMN READER
 * 5. ROW READER
 * 6. DAY FINDER
 * 7. NAMES FINDER
 * 8. SHIFTS FINDER
 * 
 */

// 1. PARSER ______________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Fetches data from xlsm file & turn it into JS object
 * 
 * @returns { object } spreadsheet as JS object
 */
const parser = async () => {
  // 1. Custom API returns the name of the latest uploaded file in 'public/xlsFiles' folder
  const getLatestFile = await fetch('/api/latestFile')
  const latestFileName = await getLatestFile.text()
  // 2. Read File
  const file = await fetch(`xlsFiles/${latestFileName}`)
  const sheets = await file.arrayBuffer()
  const opt = {
    cellStyles: true
  }
  const feed = XLSX.read(sheets, opt)
  // 3. Send JS OBJ extracted from file API
  for (const [key, values] of Object.entries(feed.Sheets)) {
    if (key.startsWith('S')) {
      try {
        await axios.post('/api/generateFiles', { key, values })
      } catch(e) {
        console.log(e)
      }
    }
  }
}
// 2. GETWEEK _____________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Adds a method to Date object in order to get the current
 * week's number, starting from the 1st Monday of the year.
 * 
 * @returns { number } the current week's number
 */
Date.prototype.getWeek =  function() {
  const janFirst = new Date(this.getFullYear(),0,1)
  let firstMonday
  for (let i = 0; i < 6; i++) {
    // Sunday - Saturday : 0 - 6 => Monday[1]
    if (janFirst.getDate()+i === 1) {
      firstMonday = janFirst.setDate(janFirst.getDate()) + 172800000
    }
  }

  const today = new Date(this.getFullYear(),this.getMonth(),this.getDate())
  const dayOfYear = ((today - firstMonday + 86400000)/86400000)

  return Math.ceil(dayOfYear/7)
}
// 3. DAY PICKER __________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Cuts 1st word of string to get 3 letters day tag & match it
 * against spreadsheet's cell value.
 * 
 * @returns { string } 3 letters dayTag; ex: 'mon'
 */
const dayPicker = () => {
  const newDate = new Date().toString()
  const dayTag = newDate.split(' ')[0]

  return dayTag
}
// 4. READCOL _____________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Finds & returns specific column (vertical axis)
 * 
 * @param { string } key the column number; ex 'A01'
 * @param { object } data spreasheet as JS object
 * 
 * @returns { array } all the matching column indexes
 */
  const readCol = (key, data) => {
    const columnKeys = []
    // look for first letter of string, followed by 1 to 3 digits
    const dynamicRegEx = new RegExp(`^${key}\\d{1,3}`)
    for (const keys in data) {
      if (dynamicRegEx.test(keys)) {
        columnKeys.push(keys)
      }
    }

    return columnKeys
  }
// 5. READROW _____________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Finds & returns specific row values (horizontal axis)
 * 
 * @param { string } number vertical index of the table (= row number)
 * 
 * @returns { string } regExp to match against selected number
 */
const readRow = (number) => {
  // les rows correspondant aux horaires sont sur le même index que le day
  // todayIndex pour les begin shifts et todayIndex+1 pour les end shifts
  const oneDigit = new RegExp(`[A-Z]{1,2}[${number}]\\b`, 'g')
  const twoDigits = new RegExp(`[A-Z]{1,2}[${number[0]}][${number[1]}]\\b`, 'g')
  const threeDigits = new RegExp(`[A-Z]{1,2}[${number[0]}][${number[1]}][${number[2]}]\\b`, 'g')
  let regex
  switch(number.length) {
    case 1:
      regex = oneDigit
      break
    case 2:
      regex = twoDigits
      break
    case 3: 
      regex = threeDigits
      break
    default:
      console.log('provide a number')
      break
  }

  return regex
}
// 6. FINDDAY _____________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Reads column A where days are always written;
 * If 'object.w' is of type 'string' & matches the 'dayTag', save its index
 * I.E the numbers following the first letter
 * Saves 'w' value
 * I.E string containing full date in EN format
 * 
 * @param { string } tag 3 first letters of day
 * @param { object } data the JS object representation of the spreadsheet
 * 
 * @returns { object } index: Number used as an horizontal index representing 1st line
 *                     of the selected day on the table
 *                     fullDate: String containing full date in EN format
 */
const findDay = (tag, data) => {
  let dayIndex
  let dateName

  // where 'el' represents 'A' cells numbers
  readCol('A', data).map((el) => {
    let str = data[el].w
    if (typeof str === 'string' && str.includes(tag)) {
      dayIndex = el.slice(1)
      dateName = str
    }
  })

  return {
    'index': dayIndex,
    'fullDate': dateName
  }
}
// 7. FINDNAMES ___________________________________________
/**
 * <b>DESCR:</b><br>
 * Reads column A where employees names are always written.
 * Starts at Today's Index (horizontal axis)
 * Pushes all the new names into employees array
 * 
 * @param { string } dayIndex number representing horizontal index of selected day
 * @param { object } data the JS object representation of the spreadsheet
 * 
 * @returns { array } Array of objects; each containing employee's name & horizontal index on the sheet
 */
const findNames = (dayIndex, data) => {
  const cellNb = Number(dayIndex)
  const cell = data

  let employees = []
  
  // debugger
  let i = 0
  while (Boolean(cell[`A${cellNb+i}`] && i < 20)) {
    if (typeof cell[`A${cellNb+i}`].v !== 'undefined' && typeof cell[`A${cellNb+i}`].v !== 'number' && !cell[`A${cellNb+i}`].v.includes('Effectif')) {
      const employee = {
        name: cell[`A${cellNb+i}`].v,
        index: cellNb+i
      }
      employees.push(employee)
    }
    i++
  }

  employees.forEach((el) => {
    el.shift = parseShift(el.index, data, dayIndex)
  })

  return employees
}
// 8. PARSESHIFTS _________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Parse employee's row for 1 day, returns the value of all
 * the active cells with their column identifier
 * 
 * @param { object } e event object containing row's index value
 * @param { object } data the JS object representation of the spreadsheet
 * @param { string } dayIndex line number representing the selected day on the spreadsheet
 * 
 */
const parseShift = (e, data, dayIndex) => {
  let hours = []
  let hoursNb
  let number

  /* 1st call on init() e === string
   * 2nd call on nameClick() e === object
   */
  if (typeof e === 'object') {
    number = e.target.getAttribute('data')
  } else {
    number = e.toString()
  }
  const regex = readRow(number)
  for (const key in data) {
    if (key.match(regex)) {
      if (data[key].s.patternType === 'solid') {
        hours.push(key.replace(number, ''))
      }
      // save daily total hours
      if (key.includes('AD')) {
        hoursNb = data[key].v
      }
    }
  }
  if (hours.length === 0) {
    return { dayAtWork: false }
  } else {
    let beginIndex = hours[0] + dayIndex
    let endIndex = hours[hours.length-1] + (parseInt(dayIndex)+1)
    let beginT = data[beginIndex].v
    let endT = data[endIndex].v
    // Set morning or evening prop's value
    if (beginT.substring(0, beginT.indexOf('h')) < 9 && endT.substring(0, endT.indexOf('h')) > 19) {
      return { 
        dayAtWork: true,
        starts: data[beginIndex].v,
        ends: data[endIndex].v,
        duration: hoursNb,
        morning: null
      }
    } else if (beginT.substring(0, beginT.indexOf('h')) < 9) {
      return { 
        dayAtWork: true,
        starts: data[beginIndex].v,
        ends: data[endIndex].v,
        duration: hoursNb,
        morning: true
      }
    } else {
      return { 
        dayAtWork: true,
        starts: data[beginIndex].v,
        ends: data[endIndex].v,
        duration: hoursNb,
        morning: false
      }
    }
  }
}

export { parser, dayPicker, readCol, readRow, findDay, findNames, parseShift }