import EmployeeOverviewStyles from './EmployeeOverview.module.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EmployeeOverview = () => {
  const { names } = useStoreState(state => ({
    names: state.employees
  }))
  const { updateStatus, selectEmployeeIdx } = useStoreActions(actions => ({
    updateStatus: actions.updateStatus,
    selectEmployeeIdx: actions.selectEmployeeIdx
  }))
  const handleClick = (e) => {
    selectEmployeeIdx(e.target.getAttribute('data'))
    updateStatus('single view')
  }

  return (
    <>
      <div id={EmployeeOverviewStyles.pick}>
        {names.map(el => (
          el.shift.dayAtWork ?
          <div
            key={el.index}
            data={el.index}
            name={el.name}
            className={[el.shift.morning ? EmployeeOverviewStyles.morning : EmployeeOverviewStyles.eve, EmployeeOverviewStyles.details].join(' ')}
            onClick={handleClick}
          >
            <div data={el.index} className='spacinho'></div>
            <h3 data={el.index}>{el.name}</h3>
            <h4 data={el.index}>{el.shift.starts} - {el.shift.ends}</h4>
          </div>
          :
          <div className='hide' key={el.index}></div>
        ))}
      </div>
    </>
  )
}

export default EmployeeOverview