import React, { useState } from 'react'
import MenuStyles from './Menu.module.css'
import Logo from '../logo/Logo'

const Menu = ({ weekNb, previous, next }) => {
  const [active, setActive] = useState(false)

  const handleClick = (e) => {
    setActive(!active)
  }

  return (
    <>
      <div id={MenuStyles.overlay}
        onClick={handleClick}
        className={active ? MenuStyles.active : ''}
      >
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
      <menu id={MenuStyles.menu}>
        <Logo />
        <div id={MenuStyles.week}>
          <span onClick={previous}>‹</span> 
          <span>semaine</span>
          <span>#{weekNb}</span>
          <span onClick={next}>›</span>
        </div>
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
    </>
  )
}

export default Menu