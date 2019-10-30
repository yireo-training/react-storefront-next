import { useEffect, useRef, useState, useContext, useCallback } from 'react'
import Router from 'next/router'
import merge from 'lodash/merge'
import PWAContext from '../PWAContext'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const createInitialState = () => {
    return merge(additionalData, { pageData: skeletonProps }, props, {
      loading: lazyProps.lazy != null,
      pageData: {}
    })
  }

  const { skeletonProps } = useContext(PWAContext)
  const { lazy, url, ...props } = lazyProps
  const goingBack = useRef(false)
  const [state, setState] = useState(createInitialState)
  const stateRef = useRef(state)
  const isLazy = lazyProps.lazy && lazyProps.lazy.then ? true : false

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    if (isLazy) {
      lazyProps.lazy.then(props => {
        setState(state => merge({}, state, props, { loading: false }))
      })
    } else {
      setState(createInitialState)
    }
  }, [lazyProps])

  // save the page state in history.state before navigation
  const onHistoryChange = useCallback(() => {
    if (!goingBack.current) {
      const uri = location.pathname + location.search + location.hash
      const historyState = { ...history.state, rsf: { [uri]: stateRef.current.pageData } }
      history.replaceState(historyState, document.title, uri)
      goingBack.current = false
    }
  })

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
