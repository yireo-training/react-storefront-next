import { useEffect, useRef, useState, useContext } from 'react'
import Router from 'next/router'
import merge from 'lodash/merge'
import PWAContext from '../PWAContext'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { skeletonProps } = useContext(PWAContext)
  const { lazy, url, ...props } = lazyProps
  const goingBack = useRef(false)

  let [state, setState] = useState(() =>
    merge(props, { loading: lazyProps.lazy != null, pageData: {} }, additionalData, skeletonProps)
  )

  const isLazy = lazyProps.lazy && lazyProps.lazy.then ? true : false

  useEffect(() => {
    if (isLazy) {
      lazyProps.lazy.then(props => {
        setState(state => merge({}, state, props, { loading: false }))
      })
    }
  }, [])

  const recordState = () => {
    const uri = location.pathname + location.search + location.hash

    const historyState = {
      ...history.state,
      rsf: { [uri]: state.pageData }
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

  return [state, setState]
}
