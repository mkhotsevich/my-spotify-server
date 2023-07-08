const db = require('quick.db')

const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  const time = db.get('time')
  let seconds = Math.trunc(time % 60)
  let minutes = Math.trunc((time / 60) % 60)
  let hour = Math.trunc(time / 60 / 60)
  if (seconds.toFixed().length === 1) seconds = `0${seconds}`
  if (minutes.toFixed().length === 1) minutes = `0${minutes}`
  if (hour.toFixed().length === 1) hour = `0${hour}`
  return res.json(`${hour}:${minutes}:${seconds}`)
})

module.exports = router
