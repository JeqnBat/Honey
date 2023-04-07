import fs from 'fs'

export default function handler(req, res) {
  const publicFolderPath = './public/weeks'
  fs.readdir(publicFolderPath, (err, files) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
      return
    }
    const numberOfFiles = files.length
    res.status(200).json({ numberOfFiles })
  })
}