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
  const setState = state => {
    store = { ...store, ...state }
    updateStore(store)
  }

  const fetchMore = () => {
    setState({
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

    setState({
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
    setState({
      pageData: {
        ...store.pageData,
        page: 0
      }
    })

    refresh({ loading: true })
  }

  const getURLForState = () => {
    const { filters, page, sort } = store.pageData
    const { pathname, search, hash } = window.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })

    if (filters.length) {
      query.filters = JSON.stringify(filters)
    } else {
      delete query.filters
    }

    if (page > 0) {
      query.page = page
    } else {
      delete query.page
    }

    if (sort) {
      query.sort = sort
    } else {
      delete query.sort
    }

    return pathname + qs.stringify(query, { addQueryPrefix: true }) + hash
  }

  const refresh = async ({ loading } = {}) => {
    const url = getURLForState()

    history.replaceState(history.state, document.title, url)

    setState({
      reloading: loading
    })

    const {
      pageData: { products }
    } = await fetch(`/api${url}`).then(res => res.json())

    setState({
      reloading: false,
      pageData: {
        ...store.pageData,
        products: store.pageData.page === 0 ? products : store.pageData.products.concat(products)
      }
    })
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
