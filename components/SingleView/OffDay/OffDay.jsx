import OffDayStyles from './OffDay.module.css'
import Image from 'next/image'

const OffDay = ({ name }) => {
  return (
    <>
      <div className={OffDayStyles.name}>{name}</div>
      <div className='spacer'></div>
      <div>Aujourd&apos;hui,</div>
      <div className='spacer'></div>
      <figure>
        <Image width='150' height='150' src='/icons/sleepingCat.png' alt='sleeping cat' />
      </figure>
      <div>Repose-toi bien !</div>
    </>
  )
}

export default OffDay