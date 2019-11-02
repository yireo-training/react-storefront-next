import { useMemo, useState, useEffect } from 'react'
import SearchContext from './SearchContext'
import _fetch from 'isomorphic-unfetch'
import debounce from 'lodash/debounce'
import { fetchLatest, StaleResponseError } from '../utils/fetchLatest'
import { useRouter } from 'next/router'
import useNavigationEvent from '../hooks/useNavigationEvent'

const fetch = fetchLatest(_fetch)

export default function SearchProvider({ children, initialGroups, onClose }) {
  const [state, setState] = useState({
    groups: initialGroups,
    loading: false
  })

  useEffect(() => {
    if (state.suggestions == null) {
      fetchSuggestions('')
    }
  }, [])

  useNavigationEvent(onClose)

  const router = useRouter()

  const fetchSuggestions = debounce(async text => {
    try {
      setState(state => ({
        ...state,
        loading: true
      }))

      const url = `/api/suggestions?q=${encodeURIComponent(text.trim())}`
      const { groups } = await fetch(url, { credentials: 'include' }).then(res => res.json())

      setState(state => ({
        ...state,
        loading: false,
        groups
      }))
    } catch (e) {
      if (!StaleResponseError.is(e)) {
        setState(state => ({
          ...state,
          loading: false
        }))
        throw e
      }
    }
  }, 250)

  const submit = () => {
    router.push(`/search?q=${encodeURIComponent(text.trim())}`)
  }

  // const context = useMemo(
  //   () => ({
  //     state,
  //     setState,
  //     fetchSuggestions,
  //     onClose,
  //     submit
  //   }),
  //   [state]
  // )

  const context = {
    state,
    setState,
    fetchSuggestions,
    onClose,
    submit
  }

  return <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
}
