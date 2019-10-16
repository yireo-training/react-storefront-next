import React, { forwardRef, useContext } from 'react'
import NextLink from 'next/link'
import PWAContext from './PWAContext'

export default forwardRef(function Link(props, ref) {
  const { as, href, prefetch, skeletonProps, onClick, ...other } = props

  const app = useContext(PWAContext)

  function handleClick(...args) {
    if (onClick) {
      onClick(...args)
    }
    app.skeletonProps = skeletonProps
  }

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} onClick={handleClick} />
    </NextLink>
  )
})
