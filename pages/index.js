import React, { useEffect, useState } from 'react'
import { parser, dayPicker, findDayIndex, findNames, findShift } from '../lib/logic.js'
import Loading from '../components/loading/Loading'
import Header from '/components/header/Header'
import Solo from '../components/soloView/Solo'
import Global from '../components/globalView/Global'

const Home = () => {
  const [page, setPage] = useState({
    data: null,
    weekNb: null,
    dayTag: null,
    dayIndex: null,
    employees: null,
    employee: null,
    status: 'loading'
  })

  const init = async () => {
    const today = new Date()
    
    page.data = await parser()
    // page.weekNb = today.getWeek()
    page.weekNb = '43'
    page.dayTag = dayPicker()
    page.dayIndex = findDayIndex(page.dayTag, page.data[`S${page.weekNb}`])
    page.employees = findNames(page.dayIndex, page.data[`S${page.weekNb}`])

    setPage({
      ...page,
      status: 'home'
    })
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    // Prevent bug on first load because DATA has not been fetched & cant be displayed yet
    if (page.status !== 'loading') {
      page.dayIndex = findDayIndex(page.dayTag, page.data[`S${page.weekNb}`])
      page.employees = findNames(page.dayIndex, page.data[`S${page.weekNb}`])
      setPage({
        ...page
      })
    }
  }, [page.dayTag])

  /* ALL EVENTS
  ________________________________________________________ */
  const events = (e, type) => {
    switch (type) {
      case 'dayClick':
        setPage({
          ...page,
          dayTag: e.target.getAttribute('tag')
        })
        break
      case 'nameClick':
        setPage({
          ...page,
          employee: e.target.getAttribute('name'),
          status: 'soloInterface'
        })
        break
      case 'backArrowClick':
        setPage({
          ...page,
          status: 'home'
        })
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
  switch (page.status) {
    case 'loading':
      return <Loading />
    case 'home':
      return (
        <div id='container'>
          <Header
            weekNb={page.weekNb}
            activeDay={page.dayTag}
            arrowEvent={(e) => events(e, 'backArrowClick')}
            dayEvent={(e) => events(e, 'dayClick')}
          />
          <Global names={page.employees} event={(e) => setPage({...page, dayTag: e.target.getAttribute('tag')})} 
          />
        </div>
      )
    case 'soloInterface':
      return (
        <div id='container'>
          <Header
            weekNb={page.weekNb}
            activeDay={page.dayTag}
            arrowEvent={(e) => events(e, 'backArrowClick')}
            dayEvent={(e) => events(e, 'dayClick')}
          />
          <Solo shift={page.employee.shift} />
        </div>
      )
    default:
      break
  }
}

export default Home