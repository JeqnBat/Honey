import PrevNextStyles from './PrevNext.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const PrevNext = () => {
  const { state } = useStoreState(state => ({ state: state }))
  const { updateWeek } = useStoreActions(actions => ({ updateWeek: actions.updateWeek }))

  const handleClick = async (e) => {
    let weekIncrement = e.target.className === 'prev' ? state.displayedWeekNb - 1 : state.displayedWeekNb + 1
    // use hydrate API to fetch data from new week
    const response = await fetch(`./api/loadSingleWeek?weekNb=${ weekIncrement }`)
    // check if there is a file to fetch
    if (response.status === 400) {
      window.alert(
        e.target.className === 'prev' ? 
          'il n\'y a pas de semaines avant'
            :
          'il n\'y a pas de semaines après'
      )
    } else {
      const rawText = await response.text()
      const data = JSON.parse(rawText)
      updateWeek({
        newWeekNb: weekIncrement,
        data: data
      })
    }
  }

  const handleChange = (e) => {

  }

  return (
    <div id={PrevNextStyles.week}>
      <label htmlFor='mylist'>Select an VIK</label>
      <select id='mylist' name='mylist' onChange={handleChange}>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </select>
      <span className='prev' onClick={handleClick}>‹</span> 
      <span>semaine</span>
      <span>#{state.displayedWeekNb}</span>
      <span className='next' onClick={handleClick}>›</span>
    </div>
  )
}

export default PrevNext