import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

/**
 1. 'config' object is used to configure the behavior of the serverless function
 2. 'api.bodyParser' option is used to disable the built-in body parser.
 3.When this option is set to false, you will need to handle the incoming request data manually.
 */
export const config = {
  api: {
    bodyParser: false
  }
}

// Serverless function
export default (req, res) => {
  var form = new formidable.IncomingForm()

  
  form.uploadDir = path.join(process.cwd(), 'public/xlsFiles')
  form.parse(req, function (err, fields, files) {
    var oldpath = files.file.filepath
    var newpath = path.join(form.uploadDir, files.file.originalFilename)
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err
      res.status(200).json({ message: 'File uploaded and moved!' })
    })
  })
}