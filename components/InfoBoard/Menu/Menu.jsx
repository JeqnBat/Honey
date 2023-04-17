import MenuStyles from './Menu.module.css'
import Image from 'next/image'
import axios from 'axios'
import { parser } from '../../../lib/logic.js'
import { useStoreActions } from 'easy-peasy'

const Menu = () => {
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
    <div id={MenuStyles.wrapper}>
      <div className='spacer'></div>
      <div>Envoyer un nouveau fichier</div>
      <form>
        <label htmlFor="file-input">
          <Image className={MenuStyles.FFFF} height='50' width='50' src="/icons/upload.svg" alt="upload-icon" />
          <input id="file-input" type="file" onChange={(e) => handleSubmit(e)} />
        </label>
      </form>
      <div>*format XLS exclusivement</div>
    </div>
  )
}

export default Menu