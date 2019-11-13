import createProduct from '../../../components/mocks/createProduct'
import createCustomCacheKey from 'moov-xdn/createCustomCacheKey'
import withCaching from 'moov-xdn-next/withCaching'

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
  }, 1000)
}

export default withCaching({
  edge: {
    maxAgeSeconds: 1000,
    key: createCustomCacheKey().addCookie('currency')
  }
})(fetchProduct)
