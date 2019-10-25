import useLazyProps from './useLazyProps'
import { useLocalStore } from 'mobx-react'
import { useEffect, useCallback, useRef } from 'react'
import merge from 'lodash/merge'
import { toJS, runInAction } from 'mobx'
import Router from 'next/router'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { lazy, url, ...props } = lazyProps

  const store = useLocalStore(() => ({
    ...props,
    ...additionalData,
    loading: lazyProps.lazy != null
  }))

  const updateState = useCallback(state => {
    runInAction(() => merge(store, { loading: false, ...state.props }))
  })

  useLazyProps(lazyProps, updateState)

  const goingBack = useRef(false)

  const recordState = () => {
    const uri = location.pathname + location.search + location.hash
    const snapshot = toJS(store.pageData, { detectCycles: false })

    const historyState = {
      ...history.state,
      rsf: { [uri]: snapshot }
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
    Router.beforePopState(({ url, as, options }) => {
      goingBack.current = true
      return true
    })

    Router.events.on('beforeHistoryChange', onHistoryChange)
    return () => Router.events.off('beforeHistoryChange', onHistoryChange)
  }, [])

  return store
}
