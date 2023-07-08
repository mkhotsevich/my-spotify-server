import chalk from 'chalk'
import logUpdate from 'log-update'
import config from 'config'

const baseUrl = config.get<string>('APP.BASE_URL')

const info = (message: string) => chalk.cyan(`[🔎] ${message}`)
const success = (message: string) => chalk.green(`[✅] ${message}`)
const successBold = (message: string) => chalk.bold.green(`${message}`)
const error = (message: string) => chalk.red(`[❌] ${message}`)

const startingServer = () => {
  return new Promise((resolve) => {
    let counter = 0
    const interval = setInterval(() => {
      logUpdate(info(`Саундчек сервера [${'🎹'.repeat(counter) + '⬛'.repeat(10 - counter)}] ${counter * 10}%\n`))
      counter++
      if (counter === 11) {
        clearInterval(interval)

        resolve(1)
      }
    }, 200)
  })
}

const serverStarted = (port: number) => {
  console.log(success(`Саундчек пройдет. Сервер запушен по адресу: `) + successBold(`${baseUrl}:${port}\n\n`) + info('Ожидание запросов...\n'));
}

const httpError = (status: number, url: string, message: string) => console.log(error(`Статус: ${status} | URL: ${url} | Сообщение: ${message}`))


export const Logger = {
  startingServer,
  serverStarted,
  httpError
}