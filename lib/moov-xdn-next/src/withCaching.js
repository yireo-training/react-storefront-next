import cache from './cache'

export default function withCaching(config) {
  return fn => {
    if (global.rsfSetCacheConfig) {
      // expose cache config to NextXDNPlugin by calling the function it provides as a global
      global.rsfSetCacheConfig(config)
    }

    const result = (...args) => {
      const [req, res] = args

      if (req.url && res.setHeader) {
        // handle API routes
        cache(res, config)
      } else if (req.req) {
        // handle getInitialProps
        cache(req.res, config)
      }

      return fn(...args)
    }

    result.xdnCacheConfig = config

    return result
  }
}
