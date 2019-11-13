import React, { useEffect, useMemo, useRef } from 'react'
import PWAContext from './PWAContext'
import PropTypes from 'prop-types'
import ErrorBoundary from './ErrorBoundary'
import { makeStyles } from '@material-ui/core/styles'
import LinkContextProvider from './link/LinkContextProvider'
import './profile'
import './hooks/useTraceUpdate'

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
  useStyles()
  const thumbnail = useRef(null)

  const app = useMemo(
    () => ({
      thumbnail,
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

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <PWAContext.Provider value={app}>
      <LinkContextProvider>
        <ErrorBoundary onError={errorReporter}>{children}</ErrorBoundary>
      </LinkContextProvider>
    </PWAContext.Provider>
  )
}

PWA.propTypes = {
  errorReporter: PropTypes.func
}
