import Router from 'next/router'
import { useState, useEffect } from 'react'

export default function useHistoryStore(props, addons) {
  const [state, setState] = useState({ ...props, ...addons })

  const onChange = () => {
    history.replaceState(
      { ...history.state, rsf: { props: state } },
      document.title,
      location.pathname + location.search + location.hash
    )
  }

  useEffect(() => {
    setState({ ...props, ...addons })
  }, [props])

  useEffect(() => {
    Router.events.on('beforeHistoryChange', onChange)
    return () => Router.events.off('beforeHistoryChange', onChange)
  }, [state])

  return [state, setState]
}
