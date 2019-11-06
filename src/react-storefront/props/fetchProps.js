import fetch from 'isomorphic-unfetch'

/**
 * Creates a `getInitialProps` props function that fetches props from an API endpoint. Use this
 * in conjunction with `react-storefront/hooks/useLazyStore` to display a skeleton with partial
 * data while fetching the full data for the page from the server.
 *
 * The returned function will skip displaying the skeleton if the API response can be served from
 * the browser's cache.
 *
 * Example:
 *
 * ```js
 * import useLazyStore from 'react-storefront/hooks/useLazyStore'
 * import fetchProps from 'react-storefront/props/fetchProps'
 *
 * function Product(lazyProps) {
 *   const [store, updateStore] = useLazyStore(lazyProps)
 *   const { product } = store.pageData
 *
 *   // store.loading will be true while fetching product data from the server
 *
 *   // store.pageData will be populated with the `pageData` prop provided to the <Link> element
 *   // that was clicked.  In this way you can provide partial data to a page.  For example:
 *   //
 *   // <Link href="/p/[productId]" as={`/p/${product.id}`} pageData={{ product }}>{product.name}</Link>
 *
 *   return (
 *     <Grid container spacing={4}>
 *       <Grid item xs={12}>
 *         { product.name ? <Typography variant="h1">{product.name}</Typography> : <Skeleton style={{ height: 16 }}/> }
 *       </Grid>
 *       // render the rest of the PDP
 *     </Grid>
 *   )
 * }
 *
 * Product.getInitialProps = withCaching({
 *   browser: true
 *   edge: {
 *     maxAgeSeconds: 1000,
 *     key: createCustomCacheKey().addCookie('currency')
 *   }
 * })(fetchProps(({ query }) => `/api/p/${encodeURIComponent(query.productId)}`))
 * ```
 *
 * @param {Function} createAPIURL
 */
export default function fetchProps(createAPIURL) {
  return options => {
    const server = typeof window === 'undefined'
    const host = server ? options.req.headers['host'] : ''
    const protocol = server ? (host.startsWith('localhost') ? 'http://' : 'https://') : ''
    const apiURL = `${protocol}${host}${createAPIURL(options)}`
    return createLazyProps(options.asPath, apiURL, options.rsf_app_shell === '1')
  }
}

async function createLazyProps(as, apiURL, shell) {
  if (typeof window === 'undefined') {
    if (apiURL.indexOf('?') === -1) {
      apiURL = apiURL + '?ssr=1'
    } else {
      apiURL = apiURL + '&ssr=1'
    }
  }

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
