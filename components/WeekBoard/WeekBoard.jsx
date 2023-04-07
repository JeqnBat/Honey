import WeekBoardStyles from './WeekBoard.module.css'
import { week } from '../../lib/constants.js'
import { useStoreState, useStoreActions } from 'easy-peasy'

const WeekBoard = () => {
  const { activeDay, weekDaysNb } = useStoreState(state => ({
    activeDay: state.dayTag,
    weekDaysNb: state.weekDaysNb
  }))
  const { updateActiveDay } = useStoreActions(actions => ({ updateActiveDay: actions.updateActiveDay }))

  const handleclick = (e) => {
    updateActiveDay(e.target.getAttribute('tag'))
  }

  return (
    <nav id={WeekBoardStyles.week}>
      {week.map((el, idx) =>(
        <div
          key={idx}
          className={el.tagEN === activeDay ? WeekBoardStyles.active : ''}
          onClick={handleclick}
          tag={el.tagEN}
        >
          <div tag={el.tagEN}>{el.tagFR}</div>
          <div className='spacinho'></div>
          <div tag={el.tagEN}>{weekDaysNb[idx]}</div>
        </div>
      ))}
    </nav>
  )
}

export default WeekBoard