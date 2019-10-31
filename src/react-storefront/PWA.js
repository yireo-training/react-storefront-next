import React, { useEffect, useMemo, useRef } from 'react'
import PWAContext from './PWAContext'
import AMPContext from './AMPContext'
import Router from 'next/router'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'
import './profile'
import './hooks/useTraceUpdate'
import makeStyles from '@material-ui/core/styles/makeStyles'

const ampContextValue = { ampStateId: 'rsf' }

export const styles = theme => ({
  '@global': {
    body: {
      '-webkit-tap-highlight-color': 'transparent'
    },
    a: {
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFPWA' })

export default function PWA({ children, errorReporter }) {
  const classes = useStyles()
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

  return (
    <PWAContext.Provider value={app}>
      <AMPContext.Provider value={ampContextValue}>
        <ErrorBoundary onError={errorReporter}>{children}</ErrorBoundary>
      </AMPContext.Provider>
    </PWAContext.Provider>
  )
}

PWA.propTypes = {
  errorReporter: PropTypes.func
}
