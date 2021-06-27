require('dotenv').config()

const app = require('./app')
const database = require('./database')

const start = async () => {
  try {
    await database.authenticate()
    await database.sync({ force: true })
    app.listen(5000, () => console.log('Server started on port 5000'))
  } catch (e) {
    console.error(e)
  }
}

start()
