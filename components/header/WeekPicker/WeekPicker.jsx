import WeekPickerStyles from './WeekPicker.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'
import React, { useState, useEffect, useRef } from 'react'

const WeekPicker = () => {
  const { state } = useStoreState(state => ({ state: state }))
  const { setState } = useStoreActions(actions => ({ setState: actions.setState }))

  const [HasRendered, setHasRendered] = useState(false)
  const rotateElement = useRef(null)

  useEffect(() => {
    if (HasRendered && rotateElement.current !== null) {
      rotateElement.current.classList.add(WeekPickerStyles.rotate)
      setTimeout(() => {
        rotateElement.current.classList.remove(WeekPickerStyles.rotate)
      }, 500)
    } else {
      setHasRendered(true)
    }
  }, [state.displayedWeekNb])

  const handleClick = () => {
    setState({
      overlayActive: true,
      overlaySource: 'WeekPicker'
    })
  }

  return (
    <div id={WeekPickerStyles.wrapper} onClick={handleClick}>
      <span>semaine</span>
        <span 
          ref={rotateElement}
          id={WeekPickerStyles.weekNb}
        >
          {`#${state.displayedWeekNb}`}
        </span>
    </div>
  )
}

export default WeekPicker