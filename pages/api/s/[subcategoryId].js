import createProducts from '../../../src/mocks/createProducts'
import createFacets from '../../../src/mocks/createFacets'

export default function getSubcategory(req, res) {
  let {
    query: { subcategoryId, page, filters }
  } = req

  res.setHeader('cache-control', 'no-cache, no-store, max-age: 0')

  if (filters) {
    filters = JSON.parse(filters)
  }

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
              total: 100,
              filters,
              appliedFilters: filters,
              facets: createFacets(),
              products: createProducts(20)
            }
          })
        )
      }

      resolve()
    }, 1)
  })
}
