import createProducts from '../../../src/mocks/createProducts'
import createFacets from '../../../src/mocks/createFacets'

export default function getSubcategory(req, res) {
  let {
    query: { subcategoryId, page = 0, filters }
  } = req

  res.setHeader('cache-control', 'no-cache, no-store, max-age: 0')

  if (filters) {
    filters = JSON.parse(filters)
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.end(
        JSON.stringify({
          pageData: {
            id: subcategoryId,
            name: `Subcategory ${subcategoryId}`,
            title: `Subcategory ${subcategoryId}`,
            total: 100,
            page: parseInt(page),
            filters,
            appliedFilters: filters,
            facets: createFacets(),
            products: createProducts(20, page)
          }
        })
      )

      resolve()
    }, 1)
  })
}
