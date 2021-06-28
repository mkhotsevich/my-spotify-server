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
      path: '/home/std/mkhotsevich.ru',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
