const withOffline = require('next-offline')

module.exports = function withServiceWorker(config) {
  return withOffline({
    ...config,
    workboxOpts: {
      clientsClaim: true,
      skipWaiting: true,
      importScripts: [`/react-storefront-sw.js`]
    }
  })
}
