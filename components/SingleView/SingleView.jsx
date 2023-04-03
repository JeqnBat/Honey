import React from 'react'
import SingleViewStyles from './SingleView.module.css'
import { useStoreState } from 'easy-peasy'

const SingleView = () => {
  const { employees, name } = useStoreState(state => ({
    employees: state.employees,
    name: state.activeEmployeeName
  }))
  /* trim() = bug fixer; ex "Jean " instead of "Jean" */
  const activeEmployee = employees.find(el => el.name.trim() === name)
  const { dayAtWork, duration, ends, morning, starts } = activeEmployee.shift
  
  if (dayAtWork) {
    // Time formatting logic -> 12h30 to 12.30
    const format = new RegExp('(h)([0-9]){2}', 'g')
    const format2 = new RegExp('(h)([0-9]){2}', 'g')
    const fEnds = format.test(ends) ? ends.replace('h', '.') : ends.replace('h', '')
    const fStarts = format2.test(starts) ? starts.replace('h', '.') : starts.replace('h', '')

    return (
      <section id={SingleViewStyles.wrapper}>
        <div className='spacer'></div>
        <div className='spacer'></div>
        <div className={SingleViewStyles.portrait}>
          <figure><img src='./icons/bee.png' /></figure>
        </div>
        <div className='spacer'></div>
        <div className={SingleViewStyles.name}>{name}</div>
        <div className='spacer'></div>
        <div>Aujourd'hui,</div>
        <div className='spacer'></div>
        <div id={SingleViewStyles.stats}>
          <div>
            <div>Tu bosses de</div>
            <div>{fStarts}</div>
            <div>à</div>
            <div>{fEnds}</div>
          </div>
          <div>
            <div>Tu es en pause de</div>
            <div>--</div>
            <div>à</div>
            <div>--</div>
          </div>
          <div>
            <div>Tu cumules</div>
            <div>{duration}</div>
            <div>heures</div>
          </div>
        </div>
      </section>
    )
  } else {
    return (    
      <section id={SingleViewStyles.wrapper}>
        <div className='spacer'></div>
        <div className='spacer'></div>
        <div className={SingleViewStyles.portrait}>
          <figure><img src='./icons/bee.png' /></figure>
        </div>
        <div className='spacer'></div>
        <div className={SingleViewStyles.name}>{name}</div>
        <div className='spacer'></div>
        <div>Aujourd'hui,</div>
        <div className='spacer'></div>
        <figure><img src='./icons/sleepingCat.png' /></figure>
        <div>Repose-toi bien !</div>
      </section>
    )

  }
}

export default SingleView