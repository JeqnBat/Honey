import React, { useEffect, useState } from 'react'

import { parser, dayPicker, readCol, readRow, findDay, findNames, findShift } from '../logic.js'


const Parser = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [weekNb, setWeekNb] = useState('lol')
  const [dayTag, setDayTag] = useState(null)
  const [todayIndex, setTodayIndex] = useState(null)
  const [employees, setEmployees] = useState([])
  const today = new Date()

  const init = async () => {
    setData(await parser())
    setWeekNb(today.getWeek())
    setDayTag(dayPicker())
    setLoaded(true)
  }

  useEffect(() => {
    init()
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
      <p> le jour de la semaine est {dayTag}</p>
      <p onClick={handleClick}>
        1. Afficher l'objet XLSM
      </p>
      <p onClick={() => readCol('A', data[`S${weekNb}`])}>
        2. Lire la colonne A
      </p>
      <p onClick={() => setTodayIndex(findDay(dayTag, data[`S${weekNb}`]))}>
        3. Matcher {dayTag} avec la liste dans l'objet et trouver l'index : {todayIndex}
      </p>
      <p onClick={() => setEmployees(findNames(todayIndex, data[`S${weekNb}`]))}>
        4. Lister les noms du jour
      </p>
      <select name="employee" id="employee" onChange={(e) => findShift(e, data[`S${weekNb}`])}>
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