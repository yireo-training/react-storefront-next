import { useEffect, useCallback, useRef, useContext } from 'react'
import PWAContext from './PWAContext'

export default function ForwardThumbnail({ children }) {
  useEffect(() => {}, [children])

  const ref = useRef(null)
  const context = useContext(PWAContext)

  const handleClick = useCallback(() => {
    const src = ref.current.querySelector('img').getAttribute('src')
    console.log('thumbnail', src)
    context.thumbnail.current = { src }
  })

  return (
    <div ref={ref} onClick={handleClick}>
      {children}
    </div>
  )
}
