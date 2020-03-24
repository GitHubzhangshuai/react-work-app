module.exports = {
    apps : [{
        name: "pm2-react-ssr-socket",
        script: "server/server.js",
        interpreter: 'node_modules/babel-cli/bin/babel-node.js',
        watch: true,
        ignore_watch: [
            "node_modules",
            "logs"
        ],
        instances: 1,
        error_file: "logs/err.log",
        out_file: "logs/out.log",
        log_date_format: "YYYY-MM-DD HH:mm:ss",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
  }
  