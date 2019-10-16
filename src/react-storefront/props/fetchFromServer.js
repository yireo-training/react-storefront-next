import { useEffect } from 'react'
import useStore from '../hooks/useLazyProps'
import fetch from 'cross-fetch'

export default async function fetchFromServer(url) {
  const fetchProps = () => fetch(url).then(res => res.json())

  if (typeof window === 'undefined') {
    return await fetchProps()
  } else {
    return { lazy: fetchProps() }
  }
}
