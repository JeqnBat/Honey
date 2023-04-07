import DateBoardStyles from './DateBoard.module.css'
import { week } from '../../lib/constants.js'
import { useStoreState } from 'easy-peasy'

const DateBoard = () => {
  const { date, status } = useStoreState(state => ({ 
    date: state.fullDate,
    status: state.status
  }))
  // Tag names translation
  let dayTagEN = date.split(' ')[0]
  let dayTagFR
  week.forEach((el) => {
    if (el.tagEN === dayTagEN) {
      dayTagFR = el.name
    }
  })

  if (status === 'files missing') {
    return (
    <></>
    )
  }
  return (
    <div id={DateBoardStyles.calendar}>
      <div>{dayTagFR}<hr></hr></div>
      <div>
        <span></span>
        <span>{date.split(' ')[1]}</span>
        <span>{date.split(' ')[2]}</span>
        <span>{date.split(' ')[3]}</span>
        <span></span>
      </div>
    </div>
  )
}

export default DateBoard