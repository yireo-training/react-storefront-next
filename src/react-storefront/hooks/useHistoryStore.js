import Router from 'next/router'
import { useState, useEffect } from 'react'

export default function useHistoryStore(props, addons) {
  const [state, setState] = useState({ ...props, ...addons })

  useEffect(() => {
    setState({ ...props, ...addons })
  }, [props])

  // save the page state in history.state before navigation
  const onChange = () => {
    history.replaceState(
      { ...history.state, rsf: { props: state } },
      document.title,
      location.pathname + location.search + location.hash
    )
  }

  useEffect(() => {
    Router.events.on('beforeHistoryChange', onChange)
    return () => Router.events.off('beforeHistoryChange', onChange)
  }, [state])

  return [state, setState]
}
