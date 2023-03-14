import path from 'path'
import fs from 'fs'

// La fonction est async pour permettre d'attendre fs.promises.readdir(dirPath)
// sinon je dois entrer la suite du code dans la méthode readdir et confiner
// les res.status(200) dans le scope de la fonction ce qui bloque la réponse
// de l'API et l'empêche de fonctionner.
export default async function handler (req, res) {
  try {
    // CWD = Current Working Directory; ici la root de l'app
    // avec join(), chaque argument représente un subfolder
    const dirPath = path.join(process.cwd(), 'public', 'xlsFiles')
    const files = await fs.promises.readdir(dirPath);

    const fileDates = files
      .filter(file => fs.lstatSync(path.join(dirPath, file)).isFile())
      .map(file => ({
        name: file,
        date: fs.statSync(path.join(dirPath, file)).mtime.getTime()
      }))
      .sort((a, b) => b.date - a.date)

    if (fileDates.length === 0) {
      res.status(404).send('No files found')
    } else {
      const latestFile = fileDates[0].name
      res.status(200).send(latestFile)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}