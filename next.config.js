const path = require('path')
const withServiceWorker = require('./src/react-storefront/webpack/withServiceWorker')
const webpack = require('webpack')
const API_VERSION = new Date().getTime()
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const NextXDNPlugin = require('./src/moov-xdn-next/webpack/NextXDNPlugin')

module.exports = withServiceWorker({
  target: 'serverless',
  webpack(config, options) {
    config.resolve.alias['react-storefront'] = path.join(__dirname, 'src', 'react-storefront')

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.RSF_API_VERSION': JSON.stringify(API_VERSION)
      })
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    if (!options.isServer) {
      if (process.env.analyze === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin())
      }
      config.plugins.push(
        new NextXDNPlugin({
          outputFile: './tmp/oem.json'
        })
      )
      //   config.plugins.push(generateServiceWorker(options.config))
    }

    return config
  }
})
