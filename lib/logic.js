/**
 * fileName: logic.js
 * madeBy: JB PELLIER
 * topic: parse job's spreadsheets & timetables & make workers shifts much more readable
 * 
 * General custom methods are stored & exported from here into the app.
 */

import XLSX from 'xlsx'

/**
 * ============ FUNCTIONS INDEX ============
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
 * 
 */

/* 1. PARSER
________________________________________________________ */
/**
 * <b>DESCR:<b><br>
 * Fetches data from xlsm file & turn it into JS object
 * 
 * @returns {object} spreadsheet as JS object
 */
const parser = async () => {
  const file = await fetch('file.xlsm')
  const sheets = await file.arrayBuffer()
  const opt = {
    cellStyles: true
  }
  const feed = XLSX.read(sheets, opt)

  // returns only 1 key('Sheets') of the original object to shorten code
  return feed.Sheets
}
/* 2. GETWEEK
________________________________________________________ */
/**
 * <b>DESCR:<b><br>
 * Adds a method to Date object in order to get the current
 * week's number, starting from the 1st Monday of the year.
 * 
 * @returns {number} the current week's number
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
/* 3. DAYPICKER
________________________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Cuts 1st word of string to get 3 letters day tag & match it
 * against spreadsheet's cell value.
 * 
 * @returns {string} 3 letters dayTag; ex: 'mon'
 */
const dayPicker = () => {
  const newDate = new Date().toString()
  const dayTag = newDate.split(' ')[0]

  return dayTag
}
/* 4. READCOL
________________________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Finds & returns specific column (vertical axis)
 * 
 * @param {string} key 
 * @param {object} data spreasheet as JS object
 * 
 * @returns {array} all the matching column indexes
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
/* 5. READROW
________________________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Finds & returns specific row values (horizontal axis)
 * 
 * @param {string} number vertical index of the table (= row number)
 * @param {object} data spreasheet as JS object
 * 
 * @returns {string} regExp to match against selected number
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
/* 6. FINDDAY
________________________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Reads column A where days are always written;
 * If cell content is string & matches the dayTag, save its index
 * I.E the numbers following the first letter
 * 
 * @param {string} tag 3 first letters of day
 * @param {oject} data the JS object representation of the spreadsheet
 * 
 * @returns {string} number used as an horizontal index
 *                   representing 1st line of the selected
 *                   day on the table
 */
const findDay = (tag, data) => {
  let day
  readCol('A', data).map((el) => {
    let str = data[el].w
    if (typeof str === 'string' && str.includes(tag)) {
      day = el.slice(1)
    }
  })

  return day
}
/* 7. FINDNAMES
________________________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Reads column A where employees names are always written.
 * Starts at Today's Index (horizontal axis)
 * Pushes all the new names into employees array
 * 
 * @param {string} todayIndex number representing horizontal index of today
 * @param {oject} data the JS object representation of the spreadsheet
 * 
 * @returns {array} all employees names for this day
 */
const findNames = (todayIndex, data) => {
  // debugger
  const cellNb = Number(todayIndex)
  const cell = data

  let employees = []
  let i = 0

  while(i < 20 || typeof cell[`A${cellNb+i}`].v === 'number') {
    if (typeof cell[`A${cellNb+i}`].v !== 'undefined' && typeof cell[`A${cellNb+i}`].v !== 'number' && !cell[`A${cellNb+i}`].v.includes('Effectif')) {
      const employee = {
        name: cell[`A${cellNb+i}`].v,
        index: cellNb+i
      }
      employees.push(employee)
    }
    i++
  }

  return employees
}
/* 8. FINDSHIFTS
________________________________________________________ */
/**
 * <b>DESCR:</b><br>
 * Parse employee's row for 1 day, returns the value of all
 * the active cells with their column identifier
 * 
 * @param {object} e event object containing row's index value
 * @param {object} data the JS object representation of the spreadsheet
 * 
 */
const findShift = (e, data, today) => {
  const number = e.target.value
  const regex = readRow(number)

  let hours = []

  let hoursNb

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
    let beginIndex = hours[0] + today
    let endIndex = hours[hours.length-1] + (parseInt(today)+1)

    return { dayAtWork: true, starts: data[beginIndex].v , ends: data[endIndex].v, duration: hoursNb }
  }
}

export { parser, dayPicker, readCol, readRow, findDay, findNames, findShift }