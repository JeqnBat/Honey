import React, { useEffect, useState } from 'react'
import { parser, dayPicker, findDay, findNames, findShift } from '../lib/logic.js'
import Loading from '../components/loading/Loading'
import Header from '../components/header/Header'

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
      <Loading />
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
        <div>
          <p>{shift.starts} - {shift.ends}</p>
          <p>heures travaillées aujourd'hui</p>
          <p>{shift.duration}</p>
        </div>
          :
        <p>pas de travail</p>
      }
    </div>
  )
}

export default Home