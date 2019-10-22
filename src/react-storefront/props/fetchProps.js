import fetch from 'isomorphic-unfetch'

export default async function fetchProps(url) {
  const doFetch = (onlyHit = false) => {
    const headers = {
      'x-rsf-api-version': '1'
    }

    if (onlyHit) {
      headers['x-rsf-client-if'] = 'cache-hit'
    }

    return fetch(url, {
      cache: 'force-cache',
      headers
    })
  }

  if (typeof window === 'undefined') {
    return (await doFetch()).json()
  } else {
    const res = await doFetch(true)

    console.log('res.status', res.status)

    if (res.status === 204) {
      // response not found in browser cache, fetch from the network and return lazy props
      return { lazy: doFetch().then(res => res.json()) }
    } else {
      // response was found in the cache, return immediately
      return res.json()
    }
  }
}
