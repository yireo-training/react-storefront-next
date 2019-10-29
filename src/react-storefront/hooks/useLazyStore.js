import { useEffect, useRef, useState, useContext } from 'react'
import Router from 'next/router'
import merge from 'lodash/merge'
import PWAContext from '../PWAContext'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { skeletonProps } = useContext(PWAContext)
  const { lazy, url, ...props } = lazyProps
  const goingBack = useRef(false)

  let [store, setStore] = useState(() =>
    merge(props, { loading: lazyProps.lazy != null, pageData: {} }, additionalData, skeletonProps)
  )

  const updateStore = state => {
    setStore(state)
    return state
  }

  const isLazy = lazyProps.lazy && lazyProps.lazy.then ? true : false

  useEffect(() => {
    if (isLazy) {
      lazyProps.lazy.then(props => {
        setStore(merge({}, store, props, { loading: false }))
      })
    }
  }, [])

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
