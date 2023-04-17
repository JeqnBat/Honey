import fs from 'fs'
import path from 'path'

export default function generateFiles(req, res) {
  const { key, values } = req.body

  if (req.method === 'POST') {
    try {
      const text = JSON.stringify(values)
      const filePath = path.join(process.cwd(), 'public', 'weeks', `${key}.txt`)

      fs.writeFile(filePath, text, (err) => {
        if (err) {
          console.error(err)
          res.status(500).end()
          return
        }
      })
      res.status(200).json({ success: true })

    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, message: "Invalid JSON" })
    }
  } else {
    res.status(404).json({ success: false, message: "Not found" })
  }
}