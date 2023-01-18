import React, { useState } from 'react'
import axios from 'axios'

function UploadFile() {
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
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {response && <div>{response.message}</div>}
    </>
  )
}

export default UploadFile