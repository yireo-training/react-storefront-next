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
    // SSR
    return (await doFetch()).json()
  } else if (window.history.state.rsf) {
    // Previous props for this page were recorded in history.state
    // This means we're going back
    console.log('restoring from history state', window.history.state.rsf.props.subcategory.id)
    return { key: url, ...window.history.state.rsf.props }
  } else {
    // normal client side navigation, fetch from network
    return { key: url, url, lazy: doFetch().then(res => res.json()) }

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
