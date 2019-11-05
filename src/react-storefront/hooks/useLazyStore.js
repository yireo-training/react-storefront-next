import { useEffect, useRef, useState, useContext, useCallback } from 'react'
import Router from 'next/router'
import merge from 'lodash/merge'
import PWAContext from '../PWAContext'
import fetch from 'isomorphic-unfetch'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const pwaContext = useContext(PWAContext)
  const skeletonProps = pwaContext && pwaContext.skeletonProps
  const isLazy = lazyProps.lazy ? true : false
  const isInitialMount = useRef(true)

  const createInitialState = () => {
    return merge(additionalData, { pageData: skeletonProps }, props, {
      loading: lazyProps.lazy != null,
      pageData: {}
    })
  }

  const { lazy, url, ...props } = lazyProps
  const goingBack = useRef(false)
  const [state, setState] = useState(createInitialState)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    if (isLazy) {
      fetch(lazyProps.lazy)
        .then(res => res.json())
        .then(props => setState(state => merge({}, state, props, { loading: false })))
    } else {
      if (!isInitialMount.current) {
        // there is no need to do this if we just mounted since createInitialState will return the same thing as the current state
        setState(createInitialState)
      }
    }
  }, [lazyProps])

  useEffect(() => {
    isInitialMount.current = false
  }, [])

  // save the page state in history.state before navigation
  const onHistoryChange = useCallback(() => {
    if (!goingBack.current) {
      recordState(stateRef.current.pageData)
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

/**
 * Records the page state in history.state.rsf[uri]
 * @param {Object} state The page state
 */
function recordState(state) {
  const as = location.pathname + location.search + location.hash
  const historyState = { ...history.state, as, rsf: { [as]: state } }
  history.replaceState(historyState, document.title, as)
}
