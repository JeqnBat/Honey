import UploadFailStyles from './UploadFail.module.css'
import Image from 'next/image'

const UploadFail = ({ msg }) => {
  return (
    <div id={UploadFailStyles.wrapper}>
      <div id={UploadFailStyles.warning}>
        <Image className={UploadFailStyles.img} height='70' width='70' src='/icons/warning.svg' alt='warning sign' />
      </div>
      <div>{msg}</div>
    </div>
  )
}

export default UploadFail