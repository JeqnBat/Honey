import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { fileTypeFromFile } from 'file-type'

/**
 * 1. 'config' object is used to configure the behavior of the serverless function
 * 2. 'api.bodyParser' option is used to disable the built-in body parser.
 * 3. When this option is set to false, you will need to handle the incoming request data manually.
 */
export const config = {
  api: {
    bodyParser: false
  }
}
// Serverless function
export default function handler (req, res) {
  let form = new formidable.IncomingForm()
  form.uploadDir = path.join(process.cwd(), 'public', 'xlsFiles')

  // File processing method
  form.parse(req, async function (err, fields, files) {
    // if an error occurs while uploading
    if (err) {
      return res.status(400).json({ message: 'Error Occured: ' + err})
    }
    // if no file has been selected
    if (Object.keys(files).length === 0) {
      return res.status(400).json({ message: 'Error Occured: ' + err})
    }

    let oldpath = files.file.filepath
    let newpath = path.join(form.uploadDir, files.file.originalFilename)

    // file validation starts with saving its extansion to the 'fileType' variable
    let fileType = await fileTypeFromFile(oldpath)
    // if file has been selected but has not the right extansion
    if (fileType === undefined || fileType.mime !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Prevents 'form.parse' from uploading file to the server
      fs.unlink(oldpath, (err) => {
        if (err) throw err
        console.log(`${oldpath} was deleted`)
      })
      return res.status(400).json({ message: 'Le fichier n\'a pas la bonne extension' })
    // else if file is of type 'xlsm'
    } else {
      fs.rename(oldpath, newpath, function (err) {
        return res.status(200).json({ message: 'Le fichier a bien été envoyé !' })
      })
    }
  })
}