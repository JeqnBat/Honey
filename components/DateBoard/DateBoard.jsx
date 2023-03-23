import DateBoardStyles from './DateBoard.module.css'
import { week } from '../../lib/constants.js'

const DateBoard = ({ date, activeDay, dayEvent }) => {
  let dayTagEN = date.split(' ')[0]
  let dayTagFR

  week.forEach((el) => {
    if (el.tagEN === dayTagEN) {
      dayTagFR = el.name
    }
  })

  return (
    <>
      <div className='spacer'></div>
      <div className='spacer'></div>
      <section id={DateBoardStyles.container} key={date}>
        <div className='spacer'></div>
        <div id={DateBoardStyles.calendar}>
          <div>{dayTagFR}</div>
          <div>
            <span>{date.split(' ')[1]}</span>
            <span>{date.split(' ')[2]}</span>
            <span>{date.split(' ')[3]}</span>
            <span></span>
          </div>
        </div>
      </section>
      <div className='spacer'></div>
      <nav id={DateBoardStyles.week}>
        {week.map((el, idx) => (
          <span
            key={idx}
            className={el.tagEN === activeDay ? DateBoardStyles.active : ''}
            onClick={dayEvent}
            tag={el.tagEN}
          >
            {el.tagFR}
          </span>
        ))}
      </nav>
      <div className='spacer'></div>
    </>
  )
}

export default DateBoard