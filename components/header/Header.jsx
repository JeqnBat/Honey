import HeaderStyles from './Header.module.css'

const Header = ({ weekNb }) => {
  return (
    <header id={HeaderStyles.weekNumber}>Semaine {weekNb}</header>
  )
}

export default Header