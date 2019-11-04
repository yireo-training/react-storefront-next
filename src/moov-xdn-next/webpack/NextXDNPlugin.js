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

        let customCacheKey = get(mod, 'getInitialProps.xdnCacheConfig.edge.key')

        if (customCacheKey) {
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
