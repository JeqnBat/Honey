/**
 * fileName: logic.js
 * madeBy: JB PELLIER
 * topic: parse job's spreadsheets & timetables & make workers shifts much more readable
 * 
 * General custom methods are stored & exported from here into the app.
 */

import XLSX from 'xlsx'

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
      firstMonday = janFirst.setDate(janFirst.getDate()+i)
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
 */
const readRow = (number, data) => {
  // les rows correspondant aux horaires sont sur le même index que le day
  // todayIndex pour les begin shifts et todayIndex+1 pour les end shifts
  for (const key in data) {
    if (key.endsWith(number)) {
      console.log(data[key])
    }
  }
}
/* 6. FINDDAY
________________________________________________________ */
/**
 * <B>DESCR:</B>
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
 * <B>DESCR:</B>
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
 * <B>DESCR:</B>
 * Reads column A where employees names are always written.
 * Starts at Today's Index (horizontal axis)
 * Pushes all the new names into employees array
 * 
 * @param {object} e event object containing row's index value
 * @param {object} data the JS object representation of the spreadsheet
 * 
 * @returns {array} all employees names for this day
 */
const findShift = (e, data) => {
  console.log(e.target.value)
  readRow(e.target.value, data)
}

export { parser, dayPicker, readCol, readRow, findDay, findNames, findShift }