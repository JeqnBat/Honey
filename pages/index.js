import React, { useEffect, useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import { parser, dayPicker, findDay, findNames } from '../lib/logic.js'
import Loading from '../components/Loading/Loading'
import Header from '/components/Header/Header'
import HomeGrid from '../components/HomeGrid/HomeGrid'
import DateBoard from '../components/DateBoard/DateBoard'

const Home = () => {
  // Global state logic
  // const { appData, responsive, loaded } = useStoreState(state => ({
  //   appData: state.appData,
  //   responsive: state.responsive,
  //   loaded: state.loaded.homePage
  // }))
  const { hydrate } = useStoreActions(actions => ({
    hydrate: actions.hydrate,
  }))

  // Local state logic
  const [app, setApp] = useState({
    data: null,
    weekNb: null,
    currentWeek: null,
    dayTag: null,
    dayIndex: null,
    fullDate: null,
    employees: null,
    employee: null,
    status: 'loading'
  })

  const init = async () => {
    const today = new Date()
    
    app.data = await parser()
    app.weekNb = today.getWeek()
    app.currentWeek = app.weekNb
    app.dayTag = dayPicker()
    app.day = findDay(app.dayTag, app.data[`S${app.currentWeek}`])
    app.dayIndex = app.day.index
    app.fullDate = app.day.fullDate
    app.employees = findNames(app.dayIndex, app.data[`S${app.currentWeek}`])

    setApp({
      ...app,
      status: 'home'
    })
  }
  /* USE EFFECT HOOKS _______________________________________ */
  useEffect(() => {
    init()
    hydrate()
  }, [])
  useEffect(() => {
    // Prevent bug on first load because DATA has not been fetched & cant be displayed yet
    if (app.status !== 'loading') {
      app.day = findDay(app.dayTag, app.data[`S${app.currentWeek}`])
      app.dayIndex = app.day.index
      app.fullDate = app.day.fullDate
      app.employees = findNames(app.dayIndex, app.data[`S${app.currentWeek}`])
      setApp({
        ...app
      })
    }
  }, [app.dayTag])

  /* ALL EVENTS _____________________________________________ */
  const events = (e, type) => {
    switch (type) {
      case 'dayClick':
        setApp({
          ...app,
          dayTag: e.target.getAttribute('tag')
        })
        break
      case 'backArrowClick':
        setApp({
          ...app,
          status: 'home'
        })
        break
      case 'previous':
        if (app.currentWeek - 1 > 0) {
          setApp({
            ...app,
            currentWeek: app.currentWeek - 1
          })
        } else {
          return
        }
        break
      case 'next':
        if (app.currentWeek + 1 <= app.weekNb) {
          setApp({
            ...app,
            currentWeek: app.currentWeek + 1 
          })
        } else {
          return
        }
        break
      default:
        return
    }
  }
  /* ALL RETURNS ____________________________________________ */
  /**
   * <b>DESCR:</b><br>
   * SWITCH pour afficher les différentes pages plutôt qu'un component dédié
   */
  switch (app.status) {
    case 'loading':
      return <Loading />
    case 'home':
      return (
        <div id='container'>
          <Header
            date={app.fullDate}
            weekNb={app.currentWeek}
            previous={(e) => events(e, 'previous')}
            next={(e) => events(e, 'next')}
          />
          <DateBoard
            date={app.fullDate}
            activeDay={app.dayTag}
            dayEvent={(e) => events(e, 'dayClick')}
          />
          <HomeGrid 
            names={app.employees} 
            event={(e) => console.log(e)} 
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