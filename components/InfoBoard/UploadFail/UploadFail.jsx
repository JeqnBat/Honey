import UploadFailStyles from './UploadFail.module.css'

const UploadFail = ({ msg }) => {
  return (
    <div id={UploadFailStyles.wrapper}>
      <div id={UploadFailStyles.warning}>
        <img src='./icons/warning.svg' alt='warning sign' />
      </div>
      <div>{msg}</div>
    </div>
  )
}

export default UploadFail