import React, { useEffect, useContext } from 'react'
import Router from 'next/router'
import PWAContext from './PWAContext'
import { useObserver } from 'mobx-react'

export default function Page({ children }) {
  const app = useContext(PWAContext)

  useEffect(() => {
    Router.events.on('routeChangeStart', url => {
      console.log('routeChangeStart', Router)
      app.loading = true
    })

    Router.events.on('routeChangeComplete', () => {
      app.loading = false
    })

    Router.events.on('routeChangeError', () => {
      app.loading = false
    })
  }, [])

  return useObserver(() => {
    const Skeleton = children.type.Skeleton

    return (
      <>
        {app.loading && Skeleton ? <Skeleton {...(app.skeletonProps || {})} /> : null}
        {children}
      </>
    )
  })
}
