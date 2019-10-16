import createProduct from '../../../src/mocks/createProduct'

export default function fetchProduct(req, res) {
  const {
    query: { productId }
  } = req

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
}
