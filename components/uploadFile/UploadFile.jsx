import React, { useState } from 'react'
import axios from 'axios'
import Styles from './Upload.module.css'

const UploadFile = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await axios.post('api/upload', formData)
      setResponse(data)
    } catch (err) {
      setResponse(err)
    }
    setLoading(false)
  }

  return (
    <section id={Styles.wrapper}>
      <header>
       Mettre à jour
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-input">
          <img src="./icons/upload.svg" alt="upload-icon" />
          <input id="file-input" type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <button type="submit" disabled={loading} style={{display: file ? ' ' : 'none'}}>
          lol
        </button>
      </form>
      {response && <div>{response.message}</div>}
    </section>
  )
}

export default UploadFile