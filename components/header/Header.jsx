import Logo from './Logo/Logo'
import PrevNext from './PrevNext/PrevNext'
import Menu from './Menu/Menu'
import HeaderStyles from './Header.module.css'
import { useStoreState } from 'easy-peasy'

const Header = () => {
  const { active } = useStoreState(state => ({ active: state.active }))
  
  return (
    <header 
      className={active ? HeaderStyles.active : ''}
      id={HeaderStyles.header}>
      <Logo />
      <PrevNext />
      <Menu />
    </header>
  )
}

export default Header