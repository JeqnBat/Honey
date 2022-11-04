import HeaderStyles from './Header.module.css'
import { week } from '../../lib/constants.js'

const Header = ({ weekNb, activeDay, arrowEvent, dayEvent }) => {
  return (
    <>
      <header id={HeaderStyles.weekNumber}>
        <span 
          className={HeaderStyles.backArrow}
          onClick={arrowEvent}
        >
          ←
        </span>
        <span>Semaine <span className={HeaderStyles.weekNb}>{weekNb}</span></span>
        <span></span>
      </header>
      <div className='spacer'></div>
      <div id={HeaderStyles.week}>
        {week.map((el, idx) => (
          <span
            key={idx}
            className={el.tag === activeDay ? HeaderStyles.active : ''}
            onClick={dayEvent}
            tag={el.tag}
          >
            {el.name}.
          </span>
        ))}
      </div>
    </>
  )
}

export default Header