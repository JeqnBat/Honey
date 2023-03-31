import WeekBoardStyles from './WeekBoard.module.css'
import { week } from '../../lib/constants.js'
import { useStoreState, useStoreActions } from 'easy-peasy'

const WeekBoard = () => {
  const { date, activeDay } = useStoreState(state => ({
    date: state.fullDate,
    activeDay: state.dayTag
  }))
  const { updateActiveDay } = useStoreActions(actions => ({
    updateActiveDay: actions.updateActiveDay
  }))

  // Tag names translation
  let dayTagEN = date.split(' ')[0]
  let dayTagFR
  week.forEach((el) => {
    if (el.tagEN === dayTagEN) {
      dayTagFR = el.name
    }
  })

  const handleclick = (e) => {
    updateActiveDay(e.target.getAttribute('tag'))
  }

  return (
    <nav id={WeekBoardStyles.week}>
      {week.map((el, idx) => (
        <span
          key={idx}
          className={el.tagEN === activeDay ? WeekBoardStyles.active : ''}
          onClick={handleclick}
          tag={el.tagEN}
        >
          {el.tagFR}
        </span>
      ))}
    </nav>
  )
}

export default WeekBoard