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

  /**
   * Fetches the next page of results
   */
  const fetchMore = () => {
    setState({
      pageData: {
        ...store.pageData,
        page: store.pageData.page + 1
      }
    })

    return refresh()
  }

  /**
   * Removes all filters
   * @param {Boolean} submit If true, fetches new results from the server
   */
  const clearFilters = submit => {
    setFilters([], submit)
  }

  /**
   * Switches the state of a filter
   * @param {Object} facet
   * @param {Boolean} submit If true, fetches new results from the server
   */
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

  /**
   * Updates the set of selected filters
   * @param {Object[]} filters
   * @param {Boolean} submit If true, fetches new results from the server
   */
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

  /**
   * Applies the selected filters, resets the page to 0 and fetches new results from the server.
   */
  const applyFilters = () => {
    setState({
      pageData: {
        ...store.pageData,
        page: 0
      }
    })

    refresh()
  }

  /**
   * Computes the URL for the current state of the search controls
   */
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

  /**
   * Fetches new results from the server
   * @param {Object} options
   */
  const refresh = async () => {
    const url = getURLForState()

    history.replaceState(history.state, document.title, url)

    if (store.pageData.page === 0) {
      setState({ reloading: true })
    }

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

  return (
    <SearchResultsContext.Provider
      value={{
        ...store,
        actions: {
          fetchMore,
          toggleFilter,
          clearFilters,
          applyFilters
        }
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  )
}

SearchResultsProvider.propTypes = {
  /**
   * A store returned from `react-storefront/search/useSearchResultsStore`.
   */
  store: PropTypes.object.isRequired,

  /**
   * The update function returned from `react-storefront/search/useSearchResultsStore`.
   */
  updateStore: PropTypes.func.isRequired
}
