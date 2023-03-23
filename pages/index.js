import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { parser, dayPicker, findDay, findNames } from '../lib/logic.js'
import Loading from '../components/Loading/Loading'
import Header from '/components/Header/Header'
import HomeGrid from '../components/HomeGrid/HomeGrid'
import DateBoard from '../components/DateBoard/DateBoard'

const Home = () => {
  // Global state logic
  const { app } = useStoreState(state => ({
    app: state.app
  }))
  const { hydrate, update } = useStoreActions(actions => ({
    hydrate: actions.hydrate,
    update: actions.update
  }))

  // Local state logic
  // const [app, setApp] = useState({
  //   data: null,
  //   weekNb: null,
  //   currentWeek: null,
  //   dayTag: null,
  //   dayIndex: null,
  //   fullDate: null,
  //   employees: null,
  //   employee: null,
  //   status: 'loading'
  // })

  // const init = async () => {
  //   const today = new Date()
    
  //   app.data = await parser()
  //   app.weekNb = today.getWeek()
  //   app.currentWeek = app.weekNb
  //   app.dayTag = dayPicker()
  //   app.day = findDay(app.dayTag, app.data[`S${app.currentWeek}`])
  //   app.dayIndex = app.day.index
  //   app.fullDate = app.day.fullDate
  //   app.employees = findNames(app.dayIndex, app.data[`S${app.currentWeek}`])

  //   setApp({
  //     ...app,
  //     status: 'home'
  //   })
  // }
  /* USE EFFECT HOOKS _______________________________________ */
  useEffect(() => {
    // init()
    hydrate()
    fetch('/api/getData')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  /* ALL EVENTS _____________________________________________ */
  const events = (e, type) => {
    switch (type) {
      case 'dayClick':
        update({
          ...app,
          dayTag: e.target.getAttribute('tag')
        })
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