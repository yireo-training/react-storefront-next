import createProduct from '../../../src/mocks/createProduct'

export default function fetchProduct(req, res) {
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
          color: product.colors[0],
          quantity: 1
        }
      })
    )
  }, 1)
}
