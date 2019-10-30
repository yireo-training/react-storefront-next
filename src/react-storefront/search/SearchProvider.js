import SearchContext from './SearchContext'
import { useMemo, useState } from 'react'

export default function SearchProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    text: ''
  })

  const context = useMemo(
    () => ({
      state,
      setState,
      toggleOpen(open) {
        console.log('open', open)
        setState({ ...state, open })
      },
      onTextChange(e) {},
      fetchSuggestions() {},
      submit() {}
    }),
    [state]
  )

  return <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
}
