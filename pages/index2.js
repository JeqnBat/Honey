import React, { useEffect, useState } from 'react'
import { parser, dayPicker, findDayIndex, findNames, findShift } from '../lib/logic.js'
import Loading from '../components/loading/Loading'
import Header from '/components/header/Header'
import Solo from '../components/soloView/Solo'
import Global from '../components/globalView/Global'
import { week } from '../lib/constants.js'

const Home = () => {
  const [data, setData] = useState(null)
  const [pageStatus, setPageStatus] = useState('loading')
  const [weekNb, setWeekNb] = useState(null)
  const [dayTag, setDayTag] = useState(null)
  const [todayIndex, setTodayIndex] = useState(null)
  const [employees, setEmployees] = useState([])
  const [employee, setEmployee] = useState(null)
  const [shift, setShift] = useState({})
  const today = new Date()
  let test = dayPicker()

  const init = async () => {
    setData(await parser())
    // debug file limitation to week 40
    setWeekNb('43')
    // setWeekNb(today.getWeek())
    setDayTag(dayPicker())
  }
  // Triple useEffect to emulate loading async sequence
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (data !== null) {
      setTodayIndex(findDayIndex(test, data[`S${weekNb}`]))
    }
  }, [data])
  useEffect(() => {
    if (todayIndex !== null) {
      setEmployees(findNames(todayIndex, data[`S${weekNb}`]))
    }
  }, [todayIndex])
  useEffect(() => {
    if (employees.length > 0 ) {
      employees.forEach((el) => {
        el.shift = findShift(el.index, data[`S${weekNb}`], todayIndex)
      })
      setPageStatus('globalInterface')
    }
  }, [employees])

  /* ALL EVENTS
  ________________________________________________________ */
  const events = (e, type) => {
    switch (type) {
      case 'dayClick':
        test = e.target.getAttribute('tag')
        setTodayIndex(findDayIndex(test, data[`S${weekNb}`]))
        break
      case 'nameClick':
        setShift(findShift(e, data[`S${weekNb}`], todayIndex))
        setEmployee(e.target.getAttribute('name'))
        setPageStatus('soloInterface')
        break
      case 'backArrowClick':
        setPageStatus('globalInterface')
        break
      default:
        return
    }
  }

  /* ALL RETURNS 
  _________________________________________________ */
  /**
   * <b>DESCR:</b><br>
   * SWITCH pour afficher les différentes pages plutôt qu'un component dédié
   */
  switch (pageStatus) {
    case 'loading':
      return <Loading />
    case 'globalInterface':
      return (
        <div id='container'>
          <Header
            weekNb={weekNb}
            activeDay={dayTag}
            arrowEvent={(e) => events(e, 'backArrowClick')}
            dayEvent={(e) => events(e, 'dayClick')}
          />
          <Global names={employees} event={(e) => events(e, 'nameClick')} />
        </div>
      )
    case 'soloInterface':
      return (
        <div id='container'>
          <Header
            weekNb={weekNb}
            activeDay={dayTag}
            arrowEvent={(e) => events(e, 'backArrowClick')}
            dayEvent={(e) => events(e, 'dayClick')}
          />
          <Solo shift={shift} />
        </div>
      )
    default:
      break
  }
}

export default Home