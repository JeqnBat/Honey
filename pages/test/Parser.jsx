import React, { useEffect, useState } from "react";
import XLSX from 'xlsx';
import { weekNb, columnParser } from '../logic.js'
/* couleur du fill des cells shifts = #00FF00 */

const Parser = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [today, setToday] = useState(null)
  const [todayIndex, setTodayIndex] = useState(null)
  const [employees, setEmployees] = useState([])

  const load = async () => {
    const file = await fetch("file.xlsm")
    const sheets = await file.arrayBuffer()
    const opt = {
      cellStyles: true
    }
    const workBook = XLSX.read(sheets, opt)
    setData(workBook)
    setLoaded(true)
  }

  const dayPicker = () => {
    const newDate = new Date().toString()
    const dayTag = newDate.split(' ')[0]
    setToday(dayTag)
  }
  // Read specific column keys
  const readCol = (key) => {
    const columnKeys = []
    // look for first letter of string, followed by 1 to 3 digits
    const dynamicRegEx = new RegExp(`^${key}\\d{1,3}`)
    for (const keys in data.Sheets[`S${weekNb}`]) {
      if (dynamicRegEx.test(keys)) {
        columnKeys.push(keys)
      }
    }
    return columnKeys
  }
  // Read specific row
  const readRow = (number) => {
    // les rows correspondant aux horaires sont sur le même index que le day
    // todayIndex pour les begin shifts et todayIndex+1 pour les end shifts
    for (const key in data.Sheets[`S${weekNb}`]) {
      if (key.endsWith(number) ) {
        console.log(data.Sheets[`S${weekNb}`][key])
      }
    }
  }
  // Find specific day
  const findDay = (tag) => {
    readCol('A').map((el) => {
      let str = data.Sheets[`S${weekNb}`][el].w
      if (typeof str === 'string' && str.includes(tag)) {
        setTodayIndex(el.slice(1))
      }
    })
  }
  // List names of employees today
  // call this method only once, or append array /w Xtimes the same names
  const findNames = () => {
    // debugger
    let i = 0

    const cellNb = Number(todayIndex)
    const cell = data.Sheets[`S${weekNb}`]

    while(i < 20 || typeof cell[`A${cellNb+i}`].v === 'number') {
      if (typeof cell[`A${cellNb+i}`].v !== 'undefined' && typeof cell[`A${cellNb+i}`].v !== 'number' && !cell[`A${cellNb+i}`].v.includes('Effectif')) {
        console.log(cell[`A${cellNb+i}`].v)
        console.log(cellNb+i)
        const employee = {
          name: cell[`A${cellNb+i}`].v,
          index: cellNb+i
        }
        setEmployees(current => [...current, employee])
      }
      i++
    }
  }
  /* Find Shift */
  const findShift = (e) => {
    console.log(typeof e.target.value)
    readRow('62')
  }

  useEffect(() => {
    load()
    dayPicker()
    // eslint-disable-next-line
  }, [])

  // Show Object
  const handleClick = () => {
    console.log(data)
  }


  if (!loaded) {
    return (
      <p>Loading…</p>
    )
  }
  return (
    <>
      <p> nous sommes la semaine numéro : {weekNb} </p>
      <p> le jour de la semaine est {today}</p>
      <p onClick={handleClick}>1. Afficher l'objet XLSM</p>
      <p onClick={() => readCol('A')}>2. Lire la colonne A</p>
      <p onClick={() => findDay(today)}>3. Matcher {today} avec la liste dans l'objet et trouver l'index : {todayIndex}</p>
      <p onClick={() => findNames()}>Lister les noms du jour</p>
      <select name="employee" id="employee" onChange={findShift}>
        {employees.map(el => (
          <option 
            key={el.index}
            value={el.index}
          >
            {el.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default Parser