import uploadStyles from './Upload.module.css'
import axios from 'axios'
import { parser } from '../../lib/logic.js'
import { useStoreState, useStoreActions } from 'easy-peasy'

const UploadFile = () => {
  const { overlaySource } = useStoreState(state => ({ overlaySource: state.overlaySource }))
  const { setState } = useStoreActions(action => ({ setState: action.setState }))
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // if files were found : delete them all before uploading
    // else :
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const response = await axios.post('./api/upload', formData)
      // await parser()
      // reload app to display changes
      // window.location.reload()

      setState({ 
        overlayActive: true,
        overlaySource: 'upload success',
        success: response.data.message
      })
    } catch (err) {
      setState({ 
        overlayActive: true,
        overlaySource: 'upload failed',
        error: err.response.data.message
      })
    }
  }

  return (
    <section id={uploadStyles.wrapper}>
      <form>
        <label htmlFor="file-input">
          <img src="./icons/upload.svg" alt="upload-icon" />
          <input id="file-input" type="file" onChange={(e) => handleSubmit(e)} />
        </label>
        <div className='spacinho'></div>
        <div>Envoyer un fichier XLS</div>
      </form>
    </section>
  )
}

export default UploadFile