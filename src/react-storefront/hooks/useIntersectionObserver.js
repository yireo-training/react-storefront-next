import React, { useEffect } from 'react'

export default function useIntersectionObserver(getRef, cb, deps) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // if intersectionRatio is 0, the element is out of view and we do not need to do anything.
      cb(entries[0].intersectionRatio > 0, () => observer.disconnect())
    })

    const ref = getRef()

    if (ref && ref.current) {
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, deps)
}
