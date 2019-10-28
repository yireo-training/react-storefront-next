import { useCallback } from 'react'
import useLazyStore from './useLazyStore'
import { runInAction } from 'mobx'
import qs from 'qs'

export default function useSearchResultsStore(lazyProps) {
  const fetchMore = useCallback(() => {
    runInAction(() => {
      store.pageData.page++
    })
    return refresh({ loading: false })
  })

  const clearFilters = useCallback(() => {
    setFilters([])
  })

  const toggleFilter = useCallback((facet, submit) => {
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
  })

  const setFilters = useCallback((filters, submit) => {
    const { appliedFilters } = store.pageData
    const filtersChanged =
      JSON.stringify(filters.map(v => v.toLowerCase()).sort()) !==
      JSON.stringify(appliedFilters.map(v => v.toLowerCase()).sort())

    runInAction(() => {
      Object.assign(store.pageData, {
        filters,
        filtersChanged
      })

      if (submit) {
        applyFilters()
      }
    })
  })

  const applyFilters = useCallback(() => {
    store.pageData.page = 0

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
  })

  const refresh = useCallback(async ({ loading } = {}) => {
    const { page, filters, id } = store.pageData
    const query = { page }

    if (filters.length) {
      query.filters = JSON.stringify(filters)
    }

    const url = `/api/s/${encodeURIComponent(id)}?${qs.stringify(query)}`

    runInAction(() => {
      store.reloading = loading
    })

    const result = await fetch(url).then(res => res.json())

    runInAction(() => {
      store.reloading = false
      store.pageData.appliedFilters = filters
      store.pageData.filtersChanged = false
      store.pageData.products =
        page === 0 ? result.products : store.pageData.products.concat(result.products)
    })
  })

  const store = useLazyStore(lazyProps, {
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

  return store
}
