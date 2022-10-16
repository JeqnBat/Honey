import React, { useEffect, useState } from 'react'
import { parser, dayPicker, findDay, findNames, findShift } from '../lib/logic.js'
import Header from '../components/header/Header'
import '../styles/Home.module.css'

const Home = () => {
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [weekNb, setWeekNb] = useState(null)
  const [dayTag, setDayTag] = useState(null)
  const [todayIndex, setTodayIndex] = useState(null)
  const [employees, setEmployees] = useState([])
  const [shift, setShift] = useState({})
  const today = new Date()

  const init = async () => {
    setData(await parser())
    // debug file limitation to week 40
    // setWeekNb(today.getWeek())
    setWeekNb(40)
    setDayTag(dayPicker())
    setLoaded(true)
  }
  // triple useEffect to emulate loading async sequence
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (data !== null) {
      setTodayIndex(findDay(dayTag, data[`S${weekNb}`]))
    }
  }, [data])
  useEffect(() => {
    if (todayIndex !== null) {
      setEmployees(findNames(todayIndex, data[`S${weekNb}`]))
    }
  }, [todayIndex])

  if (!loaded) {
    return (
      <p>Loading…</p>
    )
  }

  return (
    <div className='container'>
      <Header weekNb={weekNb} />
      <p> nous sommes la semaine numéro : {weekNb} </p>
      <p> le jour de la semaine est {dayTag}</p>
      <select name="employee" id="employee" onChange={(e) => setShift(findShift(e, data[`S${weekNb}`], todayIndex))}>
        {employees.map(el => (
          <option 
            key={el.index}
            value={el.index}
          >
            {el.name}
          </option>
        ))}
      </select>
      {
        shift.dayAtWork
          ?
        <p>Tu commences à {shift.starts} et tu finis à {shift.ends}<br />
        Tu travailles {shift.duration} heures aujourd'hui.</p>
          :
        <p>pas de travail</p>
      }
    </div>
  )
}

export default Home