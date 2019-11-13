const path = require('path')
const fs = require('fs')
const pathToRegexp = require('path-to-regexp')
const glob = require('glob')
const get = require('lodash/get')

/**
 * Creates .moov/oem.json by calling the getEdgeCacheConfig() static method
 * on each page component.
 */
module.exports = class NextXDNPlugin {
  constructor({ outputFile }) {
    this.outputFile = outputFile
    this.previousOEMConfigJson = null
  }

  apply(compiler) {
    compiler.hooks.done.tap('NextXDNPlugin', compilation => {
      const oemConfig = { custom_cache_keys: [] }
      const pagesDir = path.join(compiler.options.output.path, 'serverless', 'pages')

      const pages = glob.sync('**/*.{js,html}', {
        cwd: pagesDir
      })

      for (let pagePath of pages) {
        const modulePath = path.join(pagesDir, pagePath)
        const mod = pagePath.endsWith('.js') ? require(modulePath).default : {}
        const route = toRouteSyntax(pagePath.replace(/\.(html|js)$/, ''))
        const pattern = pathToRegexp(route).toString()

        let customCacheKey

        if (pagePath.startsWith('api/')) {
          customCacheKey = get(getConfigForApiRoute(mod), 'edge.key')
        } else {
          customCacheKey = get(mod, 'getInitialProps.xdnCacheConfig.edge.key')
        }

        if (customCacheKey) {
          console.log('got cache key for', pagePath)

          oemConfig.custom_cache_keys.push({
            path_regex: pattern,
            ...customCacheKey
          })
        }
      }

      if (!fs.existsSync('.moov')) {
        fs.mkdirSync('.moov')
      }

      fs.writeFileSync(
        path.join('.moov', 'oem.json'),
        JSON.stringify(oemConfig, null, '  '),
        'utf8'
      )
    })
  }
}

function toRouteSyntax(pagePath) {
  return pagePath.replace(/\[([^\]]+)\]/g, ':$1')
}

function getConfigForApiRoute(mod) {
  let config
  global.rsfSetCacheConfig = c => (config = c)
  const req = { headers: {}, url: '/' }
  const res = { end: Function.prototype }
  mod(req, res)
  return config
}
