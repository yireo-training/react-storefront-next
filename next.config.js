const path = require('path')
const withServiceWorker = require('./src/react-storefront/webpack/withServiceWorker')
const webpack = require('webpack')
const API_VERSION = new Date().getTime()

module.exports = withServiceWorker({
  target: 'serverless',
  webpack(config, options) {
    config.resolve.alias['react-storefront'] = path.join(__dirname, 'src', 'react-storefront')

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.RSF_API_VERSION': JSON.stringify(API_VERSION)
      })
    )

    // if (!options.isServer) {
    //   config.plugins.push(generateServiceWorker(options.config))
    // }

    return config
  }
})
