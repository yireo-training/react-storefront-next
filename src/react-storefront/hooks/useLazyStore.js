import useLazyProps from './useLazyProps'
import { useLocalStore } from 'mobx-react'
import { useEffect } from 'react'
import merge from 'lodash/merge'

export default function useLazyStore(lazyProps, additionalData = {}) {
  const { props, loading } = useLazyProps(lazyProps)
  const store = useLocalStore(() => ({ loading, ...props, ...additionalData }))

  useEffect(() => {
    merge(store, props, { loading })
  }, [loading, props])

  return store
}
