import HeaderStyles from './Header.module.css'
import Logo from './Logo/Logo'
import WeekPicker from './WeekPicker/WeekPicker'
import Kebab from './Kebab/Kebab'
import { useStoreState } from 'easy-peasy'

const Header = () => {
  const { active, status } = useStoreState(state => ({ 
    active: state.active, 
    status: state.status
  }))

  if (status === 'files missing') {
    return (
      <header 
        className={active ? HeaderStyles.active : ''}
        id={HeaderStyles.header}>
        <Logo />
        <Kebab />
      </header>
    )
  }
  return (
    <header 
      className={active ? HeaderStyles.active : ''}
      id={HeaderStyles.header}>
      <Logo />
      <WeekPicker />
      <Kebab />
    </header>
  )
}

export default Header