import createFacets from '../../../src/mocks/createFacets'
import createSortOptions from '../../../src/mocks/createSortOptions'
import createProduct from '../../../src/mocks/createProduct'
import colors, { indexForColor } from '../../../src/mocks/colors'

export default function getSubcategory(req, res) {
  let {
    query: { subcategoryId, page = 0, filters, sort }
  } = req

  res.setHeader('cache-control', 'no-cache, no-store, max-age: 0')

  if (filters) {
    filters = JSON.parse(filters)
  } else {
    filters = []
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
            totalPages: 5,
            filters,
            appliedFilters: filters,
            sort,
            sortOptions: createSortOptions(),
            facets: createFacets(),
            products: filterProducts(page, filters)
          }
        })
      )

      resolve()
    }, 1)
  })
}

function filterProducts(page, filters) {
  const products = []
  const filteredColors = filters
    ? filters.filter(f => f.startsWith('color')).map(f => f.replace(/^color:/, ''))
    : []

  while (products.length < 20) {
    if (filteredColors && filteredColors.length) {
      for (let color of filteredColors) {
        const index = indexForColor(color)
        const id = page * 20 + products.length * Object.keys(colors).length + index
        products.push(createProduct(id))
      }
    } else {
      products.push(createProduct(page * 20 + products.length + 1))
    }
  }

  return products
}
