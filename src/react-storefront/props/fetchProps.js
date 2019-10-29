import fetch from 'isomorphic-unfetch'

export default function fetchProps(createAPIURL) {
  return options => {
    const apiURL = createAPIURL(options)
    return createLazyProps(options.asPath, apiURL)
  }
}

async function createLazyProps(as, apiURL) {
  const doFetch = (onlyHit = false) => {
    const headers = {
      'x-rsf-api-version': '1'
    }

    if (onlyHit) {
      headers['x-rsf-client-if'] = 'cache-hit'
    }

    return fetch(apiURL, {
      cache: 'force-cache',
      headers
    })
  }

  if (typeof window === 'undefined') {
    // server
    return (await doFetch()).json()
  } else {
    // client
    const { rsf } = window.history.state

    if (rsf && rsf[as]) {
      // going back or forward
      return { key: as, pageData: rsf[as] }
    } else {
      // normal client side navigation, fetch from network
      return { key: as, lazy: doFetch().then(res => res.json()) }

      // const res = await doFetch(true)

      // if (res.status === 204) {
      //   // response not found in browser cache, fetch from the network and return lazy props
      //   return { lazy: doFetch().then(res => res.json()) }
      // } else {
      //   // response was found in the cache, return immediately
      //   return res.json()
      // }
    }
  }
}
