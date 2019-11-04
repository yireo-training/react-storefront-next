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
        cache(res, config)
      }

      return fn(...args)
    }

    return result
  }
}
