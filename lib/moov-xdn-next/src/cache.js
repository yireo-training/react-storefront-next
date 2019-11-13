import get from 'lodash/get'

export default function cache(res, config) {
  const maxAge = get(config, 'edge.maxAgeSeconds')

  if (maxAge) {
    res.setHeader('x-xdn-maxage', maxAge)
  }

  const browser = get(config, 'edge.maxAgeSeconds')

  if (browser) {
    res.setHeader('x-rsf-cache-in-browser', 1)
  }
}
