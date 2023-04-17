import SuccessStyles from './Success.module.css'
import Image from 'next/image'

const Success = ({ msg }) => {
  return (
    <div id={SuccessStyles.wrapper}>
      <div id={SuccessStyles.success}>
        <Image height='70' width='70' src='/icons/success.svg' alt='success sign' />
      </div>
      <div>{msg}</div>
    </div>
  )
}

export default Success