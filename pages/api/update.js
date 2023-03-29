import fs from 'fs'
import path from 'path'
/** 
 * 1. Check if directory is empty :
 *  1.a if (empty) { parse xlsm, map & create .txt(s), upload all the files }
 *      else { delete all files located inside folder, then parse xlsm, map & create etc. }
 */
export default function update(req, res) {
  // Check if the folder is empty
  const folder = path.join(process.cwd(), 'public', 'xlsFiles')
  fs.readdir(folder, (err, files) => {
    if (err) throw err

    if (files.length === 0) {
      res.status(404).send('Folder is empty')
    } else {
      res.status(200).send('Folder is not empty')
    }
  })
}