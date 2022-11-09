import HeaderStyles from './Header.module.css'
import { week } from '../../lib/constants.js'

const Header = ({ weekNb, activeDay, arrowEvent, dayEvent }) => {
  let date = new Date()
  var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const day = date.toLocaleDateString('fr-FR',{ weekday: 'long'})
  const monthYear = date.toLocaleDateString('fr-FR', dateOptions)
  return (
    <>
      <header id={HeaderStyles.weekNumber}>
        <div className='spacer'></div>
        <section id={HeaderStyles.calendar}>
          <div>{day}</div>
          <div>{monthYear}</div>
        </section>
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
            {el.name}
          </span>
        ))}
      </div>
    </>
  )
}

export default Header