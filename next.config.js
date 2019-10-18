const withOffline = require('next-offline')

const config = {
  target: 'serverless'
}

module.exports = withOffline(config)
