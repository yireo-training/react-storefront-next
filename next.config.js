const path = require('path')
const withServiceWorker = require('./src/react-storefront/webpack/withServiceWorker')

module.exports = withServiceWorker({
  // target: 'serverless',
  webpack(config, options) {
    config.resolve.alias['react-storefront'] = path.join(__dirname, 'src', 'react-storefront')
    config.resolve.alias['amphtml-validator'] = path.join(
      __dirname,
      'src',
      'stubs',
      'amphtml-validator.js'
    )

    if (!options.isServer) {
      // config.plugins.push(generateServiceWorker(options.config))
      // config.resolve.alias['react-loading-skeleton'] = path.join(
      //   __dirname,
      //   'src',
      //   'stubs',
      //   'react-loading-skeleton.js'
      // )
    }

    return config
  }
})
