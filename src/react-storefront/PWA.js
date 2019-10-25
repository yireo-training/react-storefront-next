import React, { useEffect } from 'react'
import PWAContext from './PWAContext'
import { useLocalStore } from 'mobx-react'
import AMPContext from './AMPContext'
import { useAmp } from 'next/amp'
import { useObserver } from 'mobx-react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'
import useSimpleNavigation from './router/useSimpleNavigation'

const ampContextValue = { ampStateId: 'rsf' }

export default function PWA({ children, menu, errorReporter }) {
  const amp = useAmp()

  const app = useLocalStore(() => ({
    amp,
    offline: false,
    loading: false,
    hydrating: true,
    menu: { open: false, ...menu },
    skeletonProps: null
  }))

  // enable client-side navigation when the user clicks a simple HTML anchor element
  // useSimpleNavigation()

  useEffect(() => {
    app.hydrating = false

    // const handleOnline = () => (app.offline = false)
    // const handleOffline = () => (app.offline = true)

    // app.offline = !navigator.onLine
    // window.addEventListener('online', handleOnline)
    // window.addEventListener('offline', handleOffline)

    const onRouteChangeComplete = () => (app.skeletonProps = null)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return useObserver(() => {
    return (
      <PWAContext.Provider value={app}>
        <AMPContext.Provider value={ampContextValue}>
          <ErrorBoundary onError={errorReporter}>{children}</ErrorBoundary>
        </AMPContext.Provider>
      </PWAContext.Provider>
    )
  })
}

PWA.propTypes = {
  errorReporter: PropTypes.func
}
