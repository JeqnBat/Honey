import React from 'react'
import SingleViewStyles from './SingleView.module.css'
import PersonalStats from './PersonalStats/PersonalStats'
import OffDay from './OffDay/OffDay'
import { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'

const SingleView = () => {
  const { employees, name } = useStoreState(state => ({
    employees: state.employees,
    name: state.activeEmployeeName
  }))
  /* trigger entry css transition */
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  // ternaire conditionnel pour check si l'employé est tjs présent dans la liste de la semaine // trim() = bug fixer; ex "Jean " instead of "Jean"
  const activeEmployee = employees.find(el => el.name.trim() === name) !== undefined ? employees.find(el => el.name.trim() === name) : 'rip'
  const { dayAtWork, duration, ends, starts } = activeEmployee !== 'rip' ? activeEmployee.shift : 'empty'


  if (activeEmployee === 'rip') {
    return (
      <section 
        className={`${SingleViewStyles.fade} ${mounted ? SingleViewStyles.isMounted : ''}`}
        id={SingleViewStyles.wrapper}
      >
        <div className='spacer'></div><div className='spacer'></div>
        <div className={SingleViewStyles.portrait}>
          <figure><img src='./icons/bee.png' /></figure>
        </div>
        <div className='spacer'></div>
        <div id={SingleViewStyles.rip}>Woops ! <br /> Il semble que cet équipier nous ait quittés…</div>
      </section>
    )
  } else if (dayAtWork) {
    return (
      <section 
        className={`${SingleViewStyles.fade} ${mounted ? SingleViewStyles.isMounted : ''}`}
        id={SingleViewStyles.wrapper}
      >
        <div className='spacer'></div><div className='spacer'></div>
        <div className={SingleViewStyles.portrait}>
          <figure><img src='./icons/bee.png' /></figure>
        </div>
        <div className='spacer'></div>
        <div className={SingleViewStyles.name}>{name}</div>
        <div className='spacer'></div>
        <PersonalStats duration={duration} ends={ends} starts={starts} />
      </section>
    )
  } else {
    return (    
      <section 
        id={SingleViewStyles.wrapper}
        className={`${SingleViewStyles.fade} ${mounted ? SingleViewStyles.isMounted : ''}`}
      >
        <div className='spacer'></div><div className='spacer'></div>
        <div className={SingleViewStyles.portrait}>
          <figure><img src='./icons/bee.png' /></figure>
        </div>
        <div className='spacer'></div>
        <OffDay name={name} />
      </section>
    )

  }
}

export default SingleView