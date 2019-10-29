import useLazyStore from '../hooks/useLazyStore2'
import qs from 'qs'

export default function useSearchResultsStore(lazyProps) {
  const fetchMore = () => {
    store = updateStore({
      pageData: {
        ...store.pageData,
        page: store.pageData.page + 1
      }
    })

    return refresh({ loading: false })
  }

  const clearFilters = submit => {
    setFilters([], submit)
  }

  const toggleFilter = (facet, submit) => {
    const { code } = facet
    const { filters } = store.pageData
    const nextFilters = [...filters]
    const index = nextFilters.indexOf(code)

    if (index === -1) {
      nextFilters.push(code)
    } else {
      nextFilters.splice(index, 1)
    }

    setFilters(nextFilters, submit)
  }

  const setFilters = (filters, submit) => {
    const { appliedFilters } = store.pageData
    const filtersChanged =
      JSON.stringify(filters.map(v => v.toLowerCase()).sort()) !==
      JSON.stringify(appliedFilters.map(v => v.toLowerCase()).sort())

    store = updateStore({
      ...store,
      pageData: {
        ...store.pageData,
        filters,
        filtersChanged
      }
    })

    if (submit) {
      applyFilters()
    }
  }

  const applyFilters = () => {
    store = updateStore({
      ...store,
      pageData: {
        ...store.pageData,
        page: 0
      }
    })

    const { filters } = store.pageData
    const { pathname, search, hash } = window.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })

    if (filters.length) {
      query.filters = JSON.stringify(filters)
    } else {
      delete query.filters
    }

    history.replaceState(
      history.state,
      document.title,
      pathname + qs.stringify(query, { addQueryPrefix: true }) + hash
    )

    refresh({ loading: true })
  }

  const refresh = async ({ loading } = {}) => {
    const { page, filters, id } = store.pageData
    const query = { page }

    if (filters.length) {
      query.filters = JSON.stringify(filters)
    }

    const url = `/api/s/${encodeURIComponent(id)}?${qs.stringify(query)}`

    console.log('before refresh', store)

    store = updateStore({
      ...store,
      reloading: loading
    })

    console.log('after refresh', store)

    const result = await fetch(url).then(res => res.json())

    store = updateStore({
      ...store,
      reloading: false,
      pageData: {
        ...store.pageData,
        appliedFilters: filters,
        filtersChanged: false,
        products: page === 0 ? result.products : store.pageData.products.concat(result.products)
      }
    })
  }

  let [store, updateStore] = useLazyStore(lazyProps, {
    reloading: false,
    pageData: {
      page: 0,
      filters: [],
      appliedFilters: [],
      filtersChanged: false
    },
    actions: {
      fetchMore,
      toggleFilter,
      clearFilters,
      applyFilters
    }
  })

  return [store, updateStore]
}
