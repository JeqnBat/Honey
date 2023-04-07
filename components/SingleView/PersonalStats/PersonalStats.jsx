import PersonalStatsStyles from './../SingleView.module.css'

const PersonalStats = ({ duration, ends, starts}) => {
  const format = new RegExp('(h)([0-9]){2}', 'g')
  const format2 = new RegExp('(h)([0-9]){2}', 'g')
  const fEnds = format.test(ends) ? ends.replace('h', '.') : ends.replace('h', '')
  const fStarts = format2.test(starts) ? starts.replace('h', '.') : starts.replace('h', '')

  return (
    <>
      <div>Aujourd'hui,</div>
      <div className='spacer'></div>
      <div id={PersonalStatsStyles.stats}>
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
    </>
  )
}

export default PersonalStats