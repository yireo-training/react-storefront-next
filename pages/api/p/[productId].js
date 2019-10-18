import createProduct from '../../../src/mocks/createProduct'

export default function fetchProduct(req, res) {
  const {
    query: { productId }
  } = req

  setTimeout(() => {
    res.end(
      JSON.stringify({
        app: {
          title: `Product ${productId}`
        },
        product: {
          ...createProduct(productId),
          selectedImage: 0
        }
      })
    )
  }, 500)
}
