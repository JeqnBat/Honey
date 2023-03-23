import serverlessMysql from 'serverless-mysql'

const db = serverlessMysql({
  config: {
    host: 'db5000812599.hosting-data.io',
    user: 'dbu8691',
    password: '48206837aA!',
    database: 'dbs721348'
  }
})

export default async function handler(req, res) {
  try {
    const results = await db.query('SELECT * FROM dbu2358793')
    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
