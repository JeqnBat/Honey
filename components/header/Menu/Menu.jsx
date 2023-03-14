import React, { useState } from 'react'
import MenuStyles from './Menu.module.css'
import UploadFile from '../../UploadFile/UploadFile'

const Menu = () => {
  const [active, setActive] = useState(false)

  const handleClick = (e) => {
    setActive(!active)
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

      <div id={MenuStyles.overlay}
        onClick={handleClick}
        className={active ? MenuStyles.active : ''}
      >
        <UploadFile />
      </div>
      <div 
        id={MenuStyles.bottomSheet}
        className={active ? MenuStyles.active : ''}
      >
        <div id={MenuStyles.bottomSheetRuler}></div>
        <div id={MenuStyles.bottomSheetItems}>
          <div>a</div>
          <div>b</div>
        </div>
      </div>
    </>
  )
}

export default Menu