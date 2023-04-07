import WeeksListStyles from './WeeksList.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const WeeksList = () => {
  const { state } = useStoreState(state => ({ state: state }))
  const { updateWeek, setState } = useStoreActions(actions => ({ 
    updateWeek: actions.updateWeek,
    setState: actions.setState
  }))
  const active = state.displayedWeekNb
  // Build an Array upon number of files
  const weekArr = Array.from({ length: state.numberOfWeeks }, (_, idx) => idx + 1)

  const handleClick = async (e) => {
    if (e.target.nodeName.toLowerCase() === 'span') {
      const numberInput = Number(e.target.dataset.value)

      const response = await fetch(`./api/loadSingleWeek?weekNb=${ numberInput}`)
      const rawText = await response.text()
      const data = JSON.parse(rawText)

      setState({ 
        displayedWeekNb: numberInput,
        overlayActive: false
      })
      updateWeek({
        newWeekNb: numberInput,
        data: data
      })
    }
  }

  return (
    <div id={WeeksListStyles.main} onClick={handleClick}>
      {weekArr.map((el, idx) => (
        <span
          key={idx}
          className={active === Number(el) ? WeeksListStyles.active : ''}
          data-value={el}
        >
          {el}
        </span>
      ))}
    </div>
  )
}

export default WeeksList