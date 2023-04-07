import LogoStyles from './Logo.module.css'
import { useStoreActions } from 'easy-peasy'

const Logo = () => {
  const { setState } = useStoreActions(actions => ({ setState: actions.setState }))

  const handleClick = () => {
    setState({ status: 'home', activeEmployeeName: null })
  }
  
  return (
    <div id={LogoStyles.logo}>
      <span onClick={(e) => handleClick(e)}>Honey</span>
    </div>
  )
}

export default Logo