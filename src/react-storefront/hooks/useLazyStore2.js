import useLazyProps from './useLazyProps'
import { useEffect, useCallback, useRef, useState } from 'react'
import merge from 'lodash/merge'
import Router from 'next/router'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { lazy, url, ...props } = lazyProps

  const [store, setStore] = useState(() =>
    merge(props, additionalData, { loading: lazyProps.lazy != null })
  )

  const updateStore = state => {
    setStore({ ...store, ...state })
  }

  useLazyProps(lazyProps, setStore)

  const goingBack = useRef(false)

  const recordState = () => {
    const uri = location.pathname + location.search + location.hash

    const historyState = {
      ...history.state,
      rsf: { [uri]: store.pageData }
    }

    history.replaceState(historyState, document.title, uri)
  }

  // save the page state in history.state before navigation
  const onHistoryChange = (...args) => {
    if (!goingBack.current) {
      recordState()
      goingBack.current = false
    }
  }

  useEffect(() => {
    Router.beforePopState(() => {
      goingBack.current = true
      return true
    })

    Router.events.on('beforeHistoryChange', onHistoryChange)
    return () => Router.events.off('beforeHistoryChange', onHistoryChange)
  }, [])

  return [store, updateStore]
}
