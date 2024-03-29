module.exports = {
  apps: [
    {
      name: 'my-spotify',
      script: 'src/index.js',
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '89.108.102.195',
      ref: 'origin/master',
      repo: 'git@github.com:mkhotsevich/my-spotify-server.git',
      path: '/var/www/mkhotsevich.ru',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    },
    development: {
      user: 'std',
      host: 'std-927.ist.mospolytech.ru',
      ref: 'origin/develop',
      repo: 'git@github.com:mkhotsevich/my-spotify-server.git',
      path: '/home/std/my-spotify-server',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env development'
    }
  }
}
