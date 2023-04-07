import SuccessStyles from './Success.module.css'

const Success = ({ msg }) => {
  return (
    <div id={SuccessStyles.wrapper}>
      <div id={SuccessStyles.success}>
        <img src='./icons/success.svg' alt='success sign' />
      </div>
      <div>{msg}</div>
    </div>
  )
}

export default Success