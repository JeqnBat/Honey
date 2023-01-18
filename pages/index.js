import React, { useEffect, useState } from 'react'
import { parser, dayPicker, findDay, findNames } from '../lib/logic.js'
import Loading from '../components/loading/Loading'
import Header from '/components/header/Header'
import Global from '../components/globalView/Global'
import Controller from '../components/controller/Controller'

const Home = () => {
  const [page, setPage] = useState({
    data: null,
    weekNb: null,
    trueWeek: null,
    dayTag: null,
    dayIndex: null,
    fullDate: null,
    employees: null,
    employee: null,
    status: 'loading'
  })

  const init = async () => {
    const today = new Date()
    
    page.data = await parser()
    // page.weekNb = today.getWeek()
    page.weekNb = '43'
    page.trueWeek = today.getWeek()
    page.dayTag = dayPicker()
    page.day = findDay(page.dayTag, page.data[`S${page.weekNb}`])
    page.dayIndex = page.day.index
    page.fullDate = page.day.fullDate
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
      page.day = findDay(page.dayTag, page.data[`S${page.weekNb}`])
      page.dayIndex = page.day.index
      page.fullDate = page.day.fullDate
      page.employees = findNames(page.dayIndex, page.data[`S${page.weekNb}`])
      setPage({
        ...page
      })
    }
  }, [page.dayTag])

  /* ALL EVENTS __________________________________________ */
  const events = (e, type) => {
    switch (type) {
      case 'dayClick':
        setPage({
          ...page,
          dayTag: e.target.getAttribute('tag')
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
  /* ALL RETURNS __________________________________ */
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
          <Controller />
          <Header
            weekNb={page.trueWeek}
            date={page.fullDate}
            activeDay={page.dayTag}
            dayEvent={(e) => events(e, 'dayClick')}
          />
          <Global names={page.employees} event={(e) => console.log(e)} 
          />
        </div>
      )
    case 'soloInterface':
      return (
        <div id='container'>
          lol
        </div>
      )
    default:
      break
  }
}

export default Home