import useLazyProps from './useLazyProps'
import { useLocalStore } from 'mobx-react'
import { useEffect } from 'react'
import merge from 'lodash/merge'
import { toJS } from 'mobx'
import Router from 'next/router'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { props, loading } = useLazyProps(lazyProps)

  const store = useLocalStore(() => ({
    loading,
    ...props,
    ...additionalData
  }))

  useEffect(() => {
    merge(store, props, { loading })
  }, [loading, props])

  // save the page state in history.state before navigation
  const onChange = () => {
    const { loading, app, ...state } = toJS(store)

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
    Router.events.on('beforeHistoryChange', onChange)
    return () => Router.events.off('beforeHistoryChange', onChange)
  }, [])

  return store
}
