import createProduct from './createProduct'

export default function createProducts(count) {
  const products = []

  for (let i = 0; i < count; i++) {
    products.push(createProduct(i + 1))
  }

  return products
}
