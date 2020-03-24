module.exports = {
    apps : [{
      name: 'pm2-react-ssr-socket',
      script: 'pmstart.js',
      instances: 2,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'local'
      },
      env_dev: {
        NODE_ENV: 'development'
      },
      env_pred: {
        NODE_ENV: 'pred'
      },
      env_prod: {
        NODE_ENV: 'production'
      }
    }],
  };