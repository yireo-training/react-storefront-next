import useLazyStore from '../hooks/useLazyStore'

export default function useSearchResultsStore(lazyProps) {
  return useLazyStore(lazyProps, {
    reloading: false,
    pageData: {
      page: 0,
      filters: [],
      sort: 'rating',
      appliedFilters: [],
      sortOptions: [],
      filtersChanged: false
    }
  })
}
