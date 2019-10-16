import createProducts from '../../../src/mocks/createProducts'

export default function getSubcategory(req, res) {
  const {
    query: { subcategoryId }
  } = req

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.end(
        JSON.stringify({
          app: {
            title: `Subcategory ${subcategoryId}`,
            menu: [{ text: 'Shirts' }, { text: 'Shoes' }, { text: 'Pants' }]
          },
          subcategory: {
            id: subcategoryId,
            name: `Subcategory ${subcategoryId}`,
            products: createProducts(20)
          }
        })
      )
      resolve()
    }, 1)
  })
}
