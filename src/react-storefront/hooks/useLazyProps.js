import { useLocalStore, useObserver } from 'mobx-react'
import { useEffect, useState } from 'react'

/**
 * Creates an observable store with an `update(data)` method that can be used
 * to update multiple properties at once.
 * @param {Function} init A function that returns the initial value for the store
 * @return {Object} A mobx observable
 */
export default function useLazyProps(props, render) {
  console.log('props', props)

  if (props.lazy && props.lazy.then) {
    const [store, setStore] = useState({ loading: true, props: {} })

    useEffect(() => {
      props.lazy.then(props => {
        setStore({ loading: false, props })
      })
    }, [])

    return render(store)
  } else {
    return render({
      loading: false,
      props: props
    })
  }
}
