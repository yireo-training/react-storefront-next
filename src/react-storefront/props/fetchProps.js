import fetch from 'cross-fetch'

export default async function fetchProps(url) {
  const doFetch = () => fetch(url).then(res => res.json())

  if (typeof window === 'undefined') {
    return await doFetch()
  } else {
    return { lazy: doFetch() }
  }
}
