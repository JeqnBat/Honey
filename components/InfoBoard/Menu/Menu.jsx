import MenuStyles from './Menu.module.css'
import axios from 'axios'
const Menu = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    // if files were found : delete them all before uploading
    // else :
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const response = await axios.post('api/upload', formData)
      const message = response.json()

      console.log(message.reponse.status);
      await parser()
      // reload app to display changes
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id={MenuStyles.wrapper}>
      <div className='spacer'></div>
      <div>Envoyer un nouveau fichier</div>
      <form>
        <label htmlFor="file-input">
          <img src="./icons/upload.svg" alt="upload-icon" />
          <input id="file-input" type="file" onChange={(e) => handleSubmit(e)} />
        </label>
      </form>
      <div>*format XLS exclusivement</div>
    </div>
  )
}

export default Menu