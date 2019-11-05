import fetch from 'isomorphic-unfetch'

export default function fetchProps(createAPIURL) {
  return options => {
    const apiURL = createAPIURL(options)
    return createLazyProps(options.asPath, apiURL, options.rsf_app_shell === '1')
  }
}

async function createLazyProps(as, apiURL, shell) {
  const doFetch = (onlyHit = false) => {
    if (onlyHit && process.env.NODE_ENV === 'development') {
      return Promise.resolve({ status: 204 })
    }

    const headers = {
      'x-rsf-api-version': process.env.RSF_API_VERSION
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
    if (shell) {
      return { key: as, lazy: apiURL }
    } else {
      return (await doFetch()).json()
    }
  } else {
    // client
    const { rsf } = window.history.state

    if (rsf && rsf[as]) {
      // going back or forward
      return { key: as, pageData: rsf[as] }
    } else {
      const res = await doFetch(true)

      if (res.status === 204) {
        // normal client side navigation, fetch from network
        return { key: as, lazy: apiURL }
      } else {
        // response was found in the cache, return immediately
        return res.json()
      }
    }
  }
}
