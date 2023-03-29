import React, { useState } from 'react'
import { parser } from '../../lib/logic.js'
import axios from 'axios'
import uploadStyles from './Upload.module.css'

const UploadFile = ({ pageStatus }) => {
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if files were found : delete them all before uploading
    // else :
    try {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const response = await axios.post('api/upload', formData)

      setStatus(response.status)
      setMessage(response.data.message)

      await parser()

    } catch (err) {
      setMessage(err)
    }
  }

  if (pageStatus === 'files missing') {
    return (
      <section id={uploadStyles.wrapper}>
        <form className={status === null ? '' : 'invisible'}>
          <label htmlFor="file-input">
            <img src="./icons/upload.svg" alt="upload-icon" />
            <input id="file-input" type="file" onChange={(e) => handleSubmit(e)} />
          </label>
          <div className='spacinho'></div>
          <div>Envoyer un fichier XLS</div>
        </form>
        {status === 200 && <div>{message}</div>}
      </section>
    )
  } else {
    return <div>il y a des fichiers, donc le component n'est displayed que dans le menu</div>
  }
}

export default UploadFile