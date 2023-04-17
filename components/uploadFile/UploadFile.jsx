import uploadStyles from './Upload.module.css'
import axios from 'axios'
import Image from 'next/image'
import { parser } from '../../lib/logic.js'
import { useStoreActions } from 'easy-peasy'

const UploadFile = () => {
  const { setState } = useStoreActions(action => ({ setState: action.setState }))
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // if files were found : delete them all before uploading
    // else :
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const response = await axios.post('./api/upload', formData)
      await parser()
      
      /* 1s delay so user have time to read */
      setTimeout(() => {
        window.location.reload()
      }, 1000)

      setState({ 
        overlayActive: true,
        overlaySource: 'upload success',
        success: response.data.message
      })
    } catch (err) {
      setState({ 
        overlayActive: true,
        overlaySource: 'upload fail',
        error: err.message
      })
    }
  }

  return (
    <section id={uploadStyles.wrapper}>
      <form>
        <label htmlFor='file-input'>
          <Image className={uploadStyles.img} height='150' width='150' src='./icons/upload.svg' alt='upload-icon' />
          <input id='file-input' type='file' onChange={(e) => handleSubmit(e)} />
        </label>
        <div className='spacinho'></div>
        <div>Envoyer un fichier XLS</div>
      </form>
    </section>
  )
}

export default UploadFile