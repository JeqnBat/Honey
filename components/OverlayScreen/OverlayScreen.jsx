import { useStoreState, useStoreActions } from 'easy-peasy'
import OverlayScreenStyles from './OverlayScreen.module.css'

const OverlayScreen = () => {
  const { active } = useStoreState(state => ({
    active: state.active
  }))
  const { toggleActive } = useStoreActions(actions => ({
    toggleActive: actions.toggleActive
  }))
  const handleClick = () => {
    toggleActive(!active)
  }

  return (    
    <div id={OverlayScreenStyles.overlay}
      onClick={handleClick}
      className={active ? OverlayScreenStyles.active : ''}>
    </div>
  )
}

export default OverlayScreen