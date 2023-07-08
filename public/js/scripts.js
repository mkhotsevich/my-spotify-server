const currentTime = document.querySelector('#currentTime')
const fullTime = document.querySelector('#fullTime')
const trackName = document.querySelector('#trackName')
// const canvas = document.getElementById('progress').getContext('2d')

// const canvasWidth = 300
// var audioEl = document.getElementById('audio')
// var ctrl = document.getElementById('audioControl')

// audioEl.addEventListener('loadedmetadata', function () {
//   var duration = audioEl.duration
//   var currentTime = audioEl.currentTime
//   document.getElementById('duration').innerHTML = convertElapsedTime(duration)
//   document.getElementById('current-time').innerHTML = convertElapsedTime(currentTime)
//   canvas.fillRect(0, 0, canvasWidth, 50)
// })

// function togglePlaying() {
//   var play = ctrl.innerHTML === 'Play'
//   var method

//   if (play) {
//     ctrl.innerHTML = 'Pause'
//     method = 'play'
//   } else {
//     ctrl.innerHTML = 'Play'
//     method = 'pause'
//   }

//   audioEl[method]()
// }

// function updateBar() {
//   canvas.clearRect(0, 0, canvasWidth, 50)
//   canvas.fillStyle = '#000'
//   canvas.fillRect(0, 0, canvasWidth, 50)

//   var currentTime = 500
//   var duration = 1000

//   if (currentTime === duration) {
//     ctrl.innerHTML = 'Play'
//   }

//   // document.getElementById('current-time').innerHTML = convertElapsedTime(currentTime)

//   var percentage = currentTime / duration
//   var progress = canvasWidth * percentage
//   canvas.fillStyle = '#FF0000'
//   canvas.fillRect(0, 0, progress, 50)
// }

// updateBar()

// function convertElapsedTime(inputSeconds) {
//   var seconds = Math.floor(inputSeconds % 60)
//   if (seconds < 10) {
//     seconds = '0' + seconds
//   }
//   var minutes = Math.floor(inputSeconds / 60)
//   return minutes + ':' + seconds
// }

async function fetchCurrentPlayingTrack() {
  const response = await fetch(
    'http://localhost:8080/player/current-track-progress'
  )
  const data = await response.json()
  return data
}

function init() {
  fetchCurrentPlayingTrack().then((data) => {
    if (data.name === '') return
    currentTime.innerHTML = data.progress
    fullTime.innerHTML = data.duration
  })
  const updateTime = setInterval(() => {
    fetchCurrentPlayingTrack().then((data) => {
      if (data.name === '') return
      if (data.name !== trackName.textContent) document.location.reload()
      currentTime.innerHTML = data.progress
      fullTime.innerHTML = data.duration
    })
  }, 1000)
}

init()
