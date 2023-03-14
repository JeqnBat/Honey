import { week } from '../../lib/constants.js'
import Logo from './Logo/Logo'
import PrevNext from './PrevNext/PrevNext'
import Menu from './Menu/Menu'
import HeaderStyles from './Header.module.css'

const Header = ({ weekNb, date, previous, next }) => {
  let dayTagEN = date.split(' ')[0]
  let dayTagFR

  week.forEach((el) => {
    if (el.tagEN === dayTagEN) {
      dayTagFR = el.name
    }
  })

  return (
    <header id={HeaderStyles.header}>
      <Logo />
      <PrevNext />
      <Menu weekNb={weekNb} previous={previous} next={next} />
    </header>
  )
}

export default Header