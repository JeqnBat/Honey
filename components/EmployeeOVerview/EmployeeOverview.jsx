import EmployeeOverviewStyles from './EmployeeOverview.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EmployeeOverview = () => {
  const { names } = useStoreState(state => ({
    names: state.employees
  }))
  const { updateStatus, setEmployeeName } = useStoreActions(actions => ({
    updateStatus: actions.updateStatus,
    setEmployeeName: actions.setEmployeeName
  }))
  const handleClick = (e) => {
    setEmployeeName(e.target.getAttribute('name'))
    updateStatus('single view')
  }

  return (
    <>
      <div id={EmployeeOverviewStyles.pick}>
        {names.map(el => (
          el.shift.dayAtWork ?
          <div
            key={el.index}
            className={[el.shift.morning ? EmployeeOverviewStyles.morning : EmployeeOverviewStyles.eve, EmployeeOverviewStyles.details].join(' ')}
            onClick={handleClick}
          >
            <div className='spacinho'></div>
            <h3>{el.name}</h3>
            <h4>{el.shift.starts} - {el.shift.ends}</h4>
            
            {/*catch name upon clicking*/}
            <div name={el.name}></div>
          </div>
          :
          <div className='hide' key={el.index}></div>
        ))}
      </div>
    </>
  )
}

export default EmployeeOverview