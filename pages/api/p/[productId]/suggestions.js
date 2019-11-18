import createProduct from '../../../../components/mocks/createProduct'

/**
 * An example endpoint that returns mock product suggestions for a PDP.
 * @param {*} req
 * @param {*} res
 */
export default function suggestions(req, res) {
  const products = []

  for (let i = 1; i <= 10; i++) {
    products.push(createProduct(i))
  }

  return res.json(products)
}
