import fs from 'fs'
import path from 'path'

export default function loadSingleWeek(req, res) {
  const incomingReqHasQuery = Object.entries(req.query).length > 0
  let weekNb
  // 1. call comes from user action, we use custom week number provided by the user
  if (incomingReqHasQuery) {
    weekNb = Number(req.query.weekNb)
  } else {
  // 2. call comes from init() on first load & we use the API current week number
    const today = new Date()
    weekNb = today.getWeek()
  }
  /* bug fixer > weekNb = 1 but fileName = 01 */
  const standardizedWeekSelector = weekNb < 10 ? `0${weekNb}` : weekNb

  const filePath = path.join(process.cwd(), 'public', 'weeks', `S${standardizedWeekSelector}.txt`)
  /* prevent bug from false filePath > -1 || +1 weekNb */
  if (!fs.existsSync(filePath, 'utf-8')) {
    res.status(400).json({message: `File not found`})
  } else {
    const fileContents = fs.readFileSync(filePath, 'utf-8')
    res.status(200).send(fileContents)
  }
}