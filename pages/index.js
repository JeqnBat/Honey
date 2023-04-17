import Loading from '../components/Loading/Loading'
import Header from '../components/Header/Header'
import DateBoard from '../components/DateBoard/DateBoard'
import WeekBoard from '../components/WeekBoard/WeekBoard'
import EmployeeOverview from '../components/EmployeeOverview/EmployeeOverview'
import SingleView from '../components/SingleView/SingleView'
import UploadFile from '../components/UploadFile/UploadFile'
import InfoBoard from '../components/InfoBoard/InfoBoard'
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

const Index = () => {
  /* GLOBAL STATE LOGIC _____________________________________ */
  const { status } = useStoreState(state => ({ status: state.status }))
  const { init, setState } = useStoreActions(actions => ({
    init: actions.init,
    setState: actions.setState
  }))
  /* USE EFFECT HOOKS _______________________________________ */
  useEffect(() => {
    async function fetchData() {
      try {
        const update = await fetch('./api/update')
        const response = update.status

        // checks if "public/xlsFiles" is empty
        if (response !== 200) {
          setState({ status: 'files missing' })
        // if not
        } else {
          const weeks = await fetch(`./api/countWeeks`)
          const { numberOfFiles } = await weeks.json()
          const res = await fetch(`./api/loadSingleWeek`)
          const rawText = await res.text()
          const data = JSON.parse(rawText)
          
          init(data)
          setState({ status: 'home', numberOfWeeks: numberOfFiles })
        }
      } catch (msg) {
        console.error(msg)
      }
    }
    fetchData()
  }, [])
  /* PAGE STATUS & CONDITIONAL RETURNS ______________________ */
  return (
    (() => {
      switch (status) {
        case 'loading':
          return <Loading />
        case 'files missing':
          return (
            <div id='container'>
              <InfoBoard />
              <Header />
              <DateBoard />
              <UploadFile />
            </div>
          )
        case 'home':
          return (
            <div id='container'>
              <InfoBoard />
              <Header />
              <div className='spacer'></div>
              <DateBoard />
              <div className='spacer'></div>
              <main>
                <WeekBoard />
                <div className='spacer'></div>
                <EmployeeOverview />
              </main>
            </div>
          )
        case 'single view':
          return (
            <div id='container'>
              <InfoBoard />
              <Header />
              <div className='spacer'></div>
              <DateBoard />
              <div className='spacer'></div>
              <main className='single-view'>
                <WeekBoard />
                <div className='spacinho'></div>
                <SingleView />
              </main>
            </div>
          )
        default:
          break
      }
    })()
  )
}

export default Index