import fs from 'fs'
import path from 'path'

export default function hydrate(req, res) {
  const { weekSelector } = req.body

  const filePath = path.join(process.cwd(), 'public', 'weeks', `S${weekSelector}.txt`)
  const fileContents = fs.readFileSync(filePath, 'utf-8')

  res.status(200).send(fileContents)
}