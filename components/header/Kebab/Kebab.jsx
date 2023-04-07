import KebabStyles from './Kebab.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const Kebab = () => {
  const { active } = useStoreState(state => ({ active: state.overlayActive }))
  const { setState } = useStoreActions(actions => ({ setState: actions.setState }))
  
  const handleClick = () => {
    setState({ 
      overlayActive: !active,
      overlaySource: 'Kebab'
   })
  }

  return (
    <menu id={KebabStyles.Kebab}>
      <div
        id={KebabStyles.button}
        className={active ? KebabStyles.active : ''}
        onClick={handleClick}
      >
        <div className={KebabStyles.dot}></div>
        <div className={KebabStyles.dot}></div>
        <div className={KebabStyles.dot}></div>
      </div>
    </menu>
  )
}

export default Kebab