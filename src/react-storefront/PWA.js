import React, { useEffect } from 'react'
import PWAContext from './PWAContext'
import { useLocalStore } from 'mobx-react'
import AMPContext from './AMPContext'
import { useAmp } from 'next/amp'
import { useObserver } from 'mobx-react'
import Router from 'next/router'

const ampContextValue = { ampStateId: 'rsf' }

export default function PWA({ children, menu }) {
  const amp = useAmp()

  const app = useLocalStore(() => ({
    amp,
    loading: false,
    hydrating: true,
    menu: { open: false, ...menu },
    skeletonProps: null
  }))

  useEffect(() => {
    app.hydrating = false

    Router.events.on('routeChangeComplete', () => {
      app.skeletonProps = null
    })
  }, [])

  return useObserver(() => {
    return (
      <PWAContext.Provider value={app}>
        <AMPContext.Provider value={ampContextValue}>{children}</AMPContext.Provider>
      </PWAContext.Provider>
    )
  })
}
