import { useState } from 'react'
import UploadFile from '../uploadFile/UploadFile'

const Controller = () => {
  const [image, setImage] = useState(null);
  const [fileURL, setFileURL] = useState(null)

  const loadFileOnBrowser = (event) => {
    if (event.target.files) {
      // Sélectionner l'élément [0] de l'array files
      // Un objet qui a des propriétés intéressantes pour nous : file name, extension, etc.
      const file = event.target.files[0]
      // Donne l'URL locale du fichier sélectionner
      setFileURL(URL.createObjectURL(file))
      console.log(fileURL)
      setImage(file)
    }
  }

  const uploadToServer = async (event) => {
    const body = new FormData()
    body.append('file', image)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body
      // get file extansion
      // Date.now().toString() + "." + path.originalFilename.split(".").pop()
    })
  }

  return (
    <div>
      <div>
        <img src={fileURL} height={'100px'} />
        <h4>Select Image</h4>
        <input type='file' name='myImage' onChange={loadFileOnBrowser} />
        <button
          type='submit'
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
      <UploadFile />
    </div>
  )
}

export default Controller
