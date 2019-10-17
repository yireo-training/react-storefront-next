import createProducts from '../../../src/mocks/createProducts'

export default function getSubcategory(req, res) {
  const {
    query: { subcategoryId, page }
  } = req

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (page != null) {
        res.end(
          JSON.stringify({
            products: createProducts(20, page)
          })
        )
      } else {
        res.end(
          JSON.stringify({
            app: {
              menu: [{ text: 'Shirts' }, { text: 'Shoes' }, { text: 'Pants' }]
            },
            subcategory: {
              id: subcategoryId,
              name: `Subcategory ${subcategoryId}`,
              title: `Subcategory ${subcategoryId}`,
              products: createProducts(20)
            }
          })
        )
      }

      resolve()
    }, 1)
  })
}
