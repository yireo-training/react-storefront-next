import createProducts from '../../../src/mocks/createProducts'
import createFacets from '../../../src/mocks/createFacets'

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
            pageData: {
              id: subcategoryId,
              name: `Subcategory ${subcategoryId}`,
              title: `Subcategory ${subcategoryId}`,
              products: createProducts(20),
              facets: createFacets(),
              total: 100,
              filters: []
            }
          })
        )
      }

      resolve()
    }, 1)
  })
}
