import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { parser } from '../lib/logic'
/* components */
import Loading from '../components/Loading/Loading'
import Header from '/components/Header/Header'
import HomeGrid from '../components/HomeGrid/HomeGrid'
import DateBoard from '../components/DateBoard/DateBoard'
import UploadFile from '../components/UploadFile/UploadFile'

const Home = () => {
  /* COMPOENTS LOGIC ________________________________________ */
  const [pageStatus, setPageStatus] = useState('loading')

  /* GLOBAL STATE LOGIC _____________________________________ */
  const { app } = useStoreState(state => ({
    app: state.app
  }))
  const { hydrate, update } = useStoreActions(actions => ({
    hydrate: actions.hydrate,
    update: actions.update
  }))
  /* USE EFFECT HOOKS _______________________________________ */
  useEffect(() => {
    hydrate()
    // checks if there are files inside "public/xlsFiles"
    fetch('api/update')
      .then((res) => {res.status === 200 ? setPageStatus('home') : setPageStatus('files missing')})
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
  /* PAGE STATUS & CONDITIONAL RETURNS ______________________ */
  switch (pageStatus) {
    case 'loading':
      return <Loading />
    case 'files missing':
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
          <UploadFile 
            pageStatus={pageStatus}
          />
        </div>
      )
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
          <p>homegrid</p>
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