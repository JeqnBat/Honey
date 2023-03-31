import { useStoreActions } from 'easy-peasy'
import LogoStyles from './Logo.module.css'

const Logo = () => {
  const { updateStatus } = useStoreActions(actions => ({
    updateStatus: actions.updateStatus
  }))

  const handleClick = () => {
    updateStatus('home')
  }
  
  return (
    <div id={LogoStyles.logo}>
      <span onClick={(e) => handleClick(e)}>Honey</span>
    </div>
  )
}

export default Logo