import { useStoreActions } from 'easy-peasy'
import LogoStyles from './Logo.module.css'

const Logo = () => {
  const { updateStatus, setEmployeeName } = useStoreActions(actions => ({
    updateStatus: actions.updateStatus,
    setEmployeeName: actions.setEmployeeName
  }))

  const handleClick = () => {
    updateStatus('home')
    setEmployeeName(null)
  }
  
  return (
    <div id={LogoStyles.logo}>
      <span onClick={(e) => handleClick(e)}>Honey</span>
    </div>
  )
}

export default Logo