import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
/* components */
import Loading from '../components/Loading/Loading'
import Header from '/components/Header/Header'
import DateBoard from '../components/DateBoard/DateBoard'
import WeekBoard from '../components/WeekBoard/WeekBoard'
import EmployeeOverview from '../components/EmployeeOverview/EmployeeOverview'
import SingleView from '../components/SingleView/SingleView'
import UploadFile from '../components/UploadFile/UploadFile'
import OverlayScreen from '../components/OverlayScreen/OverlayScreen'

const Home = () => {
  /* GLOBAL STATE LOGIC _____________________________________ */
  const { app } = useStoreState(state => ({ app: state }))
  const { init, updateStatus } = useStoreActions(actions => ({
    init: actions.init,
    updateStatus: actions.updateStatus
  }))
  /* USE EFFECT HOOKS _______________________________________ */
  useEffect(() => {
    async function fetchData() {
      try {
        const update = await fetch('api/update')
        const status = await update.status
        // checks if "public/xlsFiles" is empty
        if (status !== 200) {
          updateStatus('files missing')
        // if not
        } else {
          const response = await fetch(`/api/hydrate`)
          const rawText = await response.text()
          const data = JSON.parse(rawText)
          
          init(data)
          updateStatus('home')
        }
      } catch (msg) {
        console.error(msg)
      }
    }
    fetchData()
  }, [])
  /* PAGE STATUS & CONDITIONAL RETURNS ______________________ */
  if (app.status === 'loading') {
    return <Loading />
  } else if (app.status === 'files missing') {
    <div id='container'>
      <Header />
      <DateBoard />
      <UploadFile />
    </div>
  } else if (app.status === 'home') {
    return (
      <div id='container'>
        <OverlayScreen />
        <Header />
        <div className='spacer'></div>
        <div className='spacer'></div>
        <div className='spacer'></div>
        <DateBoard />
        <div className='spacer'></div>
        <main>
          <WeekBoard />
          <div className='spacinho'></div>
          <EmployeeOverview />
        </main>
      </div>
    )
  } else if (app.status === 'single view') {
    return (
      <div id='container'>
        <OverlayScreen />
        <Header />
        <div className='spacer'></div>
        <div className='spacer'></div>
        <div className='spacer'></div>
        <DateBoard />
        <div className='spacer'></div>
        <main
          className='single-view'
        >
          <WeekBoard />
          <div className='spacinho'></div>
          <SingleView />
        </main>
      </div>
    )
  } else {
    return
  }
}

export default Home