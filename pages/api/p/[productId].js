import createProduct from '../../../src/mocks/createProduct'

export default function fetchProduct(req, res) {
  const {
    query: { productId }
  } = req

  setTimeout(() => {
    res.setHeader('cache-control', 'no-cache, no-store')

    res.end(
      JSON.stringify({
        app: {
          title: `Product ${productId}`
        },
        pageData: {
          ...createProduct(productId),
          selectedImage: 0
        }
      })
    )
  }, 1)
}
