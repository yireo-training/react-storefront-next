import useLazyProps from './useLazyProps'
import { useLocalStore } from 'mobx-react'
import { useEffect, useCallback, useRef } from 'react'
import merge from 'lodash/merge'
import { toJS, runInAction } from 'mobx'
import Router from 'next/router'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { lazy, ...props } = lazyProps

  const store = useLocalStore(() => ({
    ...props,
    ...additionalData,
    loading: lazyProps.lazy
  }))

  const updateState = useCallback(state => {
    runInAction(() => merge(store, state, state.props))
  })

  useLazyProps(lazyProps, updateState)

  const goingBack = useRef(false)

  // save the page state in history.state before navigation
  const onHistoryChange = (...args) => {
    if (goingBack.current) {
      goingBack.current = false
      return
    }

    const { loading, app, ...state } = toJS(store)

    console.log('storing history state', location.pathname + location.search, state.subcategory.id)

    history.replaceState(
      {
        ...history.state,
        rsf: { props: state }
      },
      document.title,
      location.pathname + location.search + location.hash
    )
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
