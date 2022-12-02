import HeaderStyles from './Header.module.css'
import { week } from '../../lib/constants.js'

const Header = ({ weekNb, date, activeDay, dayEvent }) => {
  let dayTagEN = date.split(' ')[0]
  let dayTagFR
  week.forEach((el) => {
    if (el.tagEN === dayTagEN) {
      dayTagFR = el.name
    }
  })

  return (
    <>
      <header key={date}>
        <div className='spacer'></div>
        <section id={HeaderStyles.calendar}>
          <div>        
            <span>semaine </span>
            <span>{weekNb}</span>
          </div>
          <div>{dayTagFR}</div>
          <div>
            <span></span>
            <span>{date.split(' ')[1]}</span>
            <span>{date.split(' ')[2]}</span>
            <span>{date.split(' ')[3]}</span>
            <span></span>
          </div>
        </section>
      </header>
      <div className='spacer'></div>
      <div id={HeaderStyles.week}>
        {week.map((el, idx) => (
          <span
            key={idx}
            className={el.tagEN === activeDay ? HeaderStyles.active : ''}
            onClick={dayEvent}
            tag={el.tagEN}
          >
            {el.tagFR}
          </span>
        ))}
      </div>
      <div className='spacer'></div>
    </>
  )
}

export default Header