import { useEffect, useRef, useState, useContext, useCallback } from 'react'
import Router from 'next/router'
import merge from 'lodash/merge'
import LinkContext from '../link/LinkContext'
import fetch from 'isomorphic-unfetch'
import get from 'lodash/get'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const isLazy = lazyProps.lazy ? true : false
  const isInitialMount = useRef(true)

  // If linkPageData is null then lodash merge will overwrite everything in additionalData.pageData
  // It will properly merge the values if linkPageData is undefined
  const linkPageData = get(useContext(LinkContext), 'current') || undefined

  const createInitialState = () => {
    return merge({}, additionalData, { pageData: linkPageData }, props, {
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
      // We don't record pageData in history here because the browser has already changed the
      // URL to the previous page.  It's too late.  This means that going forward will always result
      // in a fetch (though usually this will just come from the browser's cache)
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
 * Records the page state in history.state.rsf[uri].  Why is this needed?  Why can we not
 * simply rely on the page data being in the browser's cache via the service worker? It's
 * because we want to restore the state of the page as the user left it, including sorting,
 * paging, and any other changes which might not be reflected in the URL.
 * @param {Object} state The page state
 */
function recordState(state) {
  const as = location.pathname + location.search + location.hash
  const historyState = { ...history.state, as, rsf: { [as]: state } }
  history.replaceState(historyState, document.title, as)
}
