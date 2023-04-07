import OffDayStyles from './../SingleView.module.css'

const OffDay = ({ name }) => {
  return (
    <>
      <div className={OffDayStyles.name}>{name}</div>
      <div className='spacer'></div>
      <div>Aujourd'hui,</div>
      <div className='spacer'></div>
      <figure><img src='./icons/sleepingCat.png' /></figure>
      <div>Repose-toi bien !</div>
    </>
  )
}

export default OffDay