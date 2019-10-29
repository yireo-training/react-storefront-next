import React from 'react'
import SearchResultsContext from './SearchResultsContext'
import PropTypes from 'prop-types'
import qs from 'qs'

/**
 * Provides context to filter, sorting, and pagination components.
 *
 * ```js
 *  import useSearchResultsStore from 'react-storefront/search/useSearchResultsStore'
 *  import SearchResultsProvider from 'react-storefront/search/SearchResultsProvider'
 *  import FilterButton from 'react-storefront/search/FilterButton'
 *
 *  function Subcategory(lazyProps) {
 *    const [store, updateStore] = useSearchResultsStore(lazyProps)
 *
 *    return (
 *      <SearchResultsProvider store={store}>
 *        <FilterButton/>
 *      </SearchResultsProvider>
 *    )
 *  }
 * ```
 */
export default function SearchResultsProvider({ store, updateStore, children }) {
  const fetchMore = () => {
    updateStore(store => ({
      pageData: {
        ...store.pageData,
        page: store.pageData.page + 1
      }
    }))

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

    updateStore(store => ({
      ...store,
      pageData: {
        ...store.pageData,
        filters,
        filtersChanged
      }
    }))

    if (submit) {
      applyFilters()
    }
  }

  const applyFilters = () => {
    updateStore(state => {
      return {
        ...state,
        pageData: {
          ...state.pageData,
          page: 0
        }
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

    updateStore(store => ({
      ...store,
      reloading: loading
    }))

    const result = await fetch(url).then(res => res.json())

    updateStore(store => ({
      ...store,
      reloading: false,
      pageData: {
        ...store.pageData,
        appliedFilters: filters,
        filtersChanged: false,
        products: page === 0 ? result.products : store.pageData.products.concat(result.products)
      }
    }))
  }

  const context = {
    ...store,
    actions: {
      fetchMore,
      toggleFilter,
      clearFilters,
      applyFilters
    }
  }

  return <SearchResultsContext.Provider value={context}>{children}</SearchResultsContext.Provider>
}

SearchResultsProvider.propTypes = {
  /**
   * A store returned from `react-storefront/search/useSearchResultsStore`.
   */
  store: PropTypes.object.isRequired
}
