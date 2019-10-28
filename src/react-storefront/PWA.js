import React, { useEffect, useMemo, useRef } from 'react'
import PWAContext from './PWAContext'
import { useLocalStore } from 'mobx-react'
import AMPContext from './AMPContext'
import { useAmp } from 'next/amp'
import { useObserver } from 'mobx-react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'
import useSimpleNavigation from './router/useSimpleNavigation'
import './profile'

const ampContextValue = { ampStateId: 'rsf' }

export default function PWA({ children, errorReporter }) {
  const thumbnail = useRef(null)
  const skeletonProps = useRef(null)

  const app = useMemo(
    () => ({
      thumbnail,
      skeletonProps,
      menu: {
        open: false
      }
    }),
    []
  )

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
