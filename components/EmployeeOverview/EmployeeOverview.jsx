import EmployeeOverviewStyles from './EmployeeOverview.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EmployeeOverview = () => {
  const { names } = useStoreState(state => ({ names: state.employees }))
  const { setState } = useStoreActions(actions => ({ setState: actions.setState }))

  const handleClick = (e) => {
    setState({ activeEmployeeName : e.target.getAttribute('name'), status: 'single view'})
  }

  const morningShifts = names.filter((el) => el.shift.morning === true && el.shift.dayAtWork === true)
  const eveningShifts = names.filter((el) => el.shift.morning !== true && el.shift.dayAtWork === true)
  const shifts = [...morningShifts, ...eveningShifts]

  return (
    <div id={EmployeeOverviewStyles.pick}>
      {shifts.map(el => (
        <div
          key={el.index}
          className={[el.shift.morning ? EmployeeOverviewStyles.morning : EmployeeOverviewStyles.eve, EmployeeOverviewStyles.details].join(' ')}
          onClick={handleClick}
        >
          <div className='spacinho'></div>
          <h3>{el.name}</h3>
          <h4>{el.shift.starts} → {el.shift.ends}</h4>
          
          {/*catch name upon clicking*/}
          <div name={el.name}></div>
        </div>
      ))}
    </div>
  )
}

export default EmployeeOverview