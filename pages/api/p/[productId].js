import createProduct from '../../../src/mocks/createProduct'
import createCustomCacheKey from '../../../src/moov-xdn/src/createCustomCacheKey'
import withCaching from '../../../src/moov-xdn-next/src/withCaching'

function fetchProduct(req, res) {
  const {
    query: { productId }
  } = req

  setTimeout(() => {
    res.setHeader('cache-control', 'no-cache, no-store')

    const product = createProduct(productId)

    res.end(
      JSON.stringify({
        app: {
          title: `Product ${productId}`
        },
        pageData: {
          product,
          quantity: 1
        }
      })
    )
  }, 1)
}

export default withCaching({
  edge: {
    maxAgeSeconds: 1000,
    key: createCustomCacheKey().addCookie('currency')
  }
})(fetchProduct)
