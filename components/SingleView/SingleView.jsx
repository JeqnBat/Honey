import React from 'react'
import SingleViewStyles from './SingleView.module.css'
import { useStoreState } from 'easy-peasy'

const SingleView = () => {
  const { employees, activeEmployeeIdx } = useStoreState(state => ({
    employees: state.employees,
    activeEmployeeIdx: state.activeEmployeeIdx
  }))

  const activeEmployee = employees.find(el => el.index === Number(activeEmployeeIdx))
  console.log(activeEmployee);
  return (
    <div>{activeEmployee.name}</div>
  )
}

export default SingleView