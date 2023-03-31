import { useStoreState, useStoreActions } from 'easy-peasy'
import MenuStyles from './Menu.module.css'
import UploadFile from '../../UploadFile/UploadFile'

const Menu = () => {
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
    <>
      <menu id={MenuStyles.menu}>
        <div
          id={MenuStyles.button}
          className={active ? MenuStyles.active : ''}
          onClick={handleClick}
        >
          <div className={MenuStyles.dot}></div>
          <div className={MenuStyles.dot}></div>
          <div className={MenuStyles.dot}></div>
        </div>
      </menu>
      <div 
        id={MenuStyles.bottomSheet}
        className={active ? MenuStyles.active : ''}
      >
        <div id={MenuStyles.bottomSheetRuler}></div>
        <div id={MenuStyles.bottomSheetItems}>
          <div>a</div>
          <div>b</div>
          <UploadFile />
        </div>
      </div>
    </>
  )
}

export default Menu