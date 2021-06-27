module.exports = {
  apps: [
    {
      name: 'my-spotify-server',
      script: 'src/index.js'
    }
  ],
  deploy: {
    production: {
      user: 'std',
      host: 'std-927.ist.mospolytech.ru',
      ref: 'origin/master',
      repo: 'git@github.com:mkhotsevich/my-spotify-server.git',
      path: '/home/std',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
