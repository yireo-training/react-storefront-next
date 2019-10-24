import delegate from 'delegate'
import fetch from 'isomorphic-unfetch'
import { useEffect, useRef } from 'react'
import Router from 'next/router'
import qs from 'qs'

/**
 * @private
 * Watches for clicks on HTML anchor tags and performs client side navigation if
 * the URL matches a next route.
 */
export default function useSimpleNavigation() {
  const routes = useRef({})

  useEffect(async () => {
    delegate('a', 'click', e => {
      const { delegateTarget } = e
      const as = delegateTarget.getAttribute('href')

      if (as) {
        e.preventDefault()
        const href = getRoute(as, routes.current)
        const url = toNextURL(href)
        Router.push(url, as)
      }
    })

    routes.current = await fetchRouteManifest()
  }, [])
}

function toNextURL(href) {
  if (!href) return null

  const url = new URL(href, window.location.protocol + window.location.hostname)

  return {
    pathname: url.pathname,
    query: qs.parse(url.search)
  }
}

function fetchRouteManifest() {
  return fetch('/api/routes').then(res => res.json())
}

function getRoute(href, routes) {
  for (let pattern in routes) {
    if (new RegExp(pattern).test(href)) {
      return routes[pattern].as
    }
  }

  return null
}
