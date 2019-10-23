import MenuContext from './MenuContext'
import { useLocalStore } from 'mobx-react'
import { toJS } from 'mobx'

import { useState, useMemo } from 'react'

export function useMenuStore(menu) {
  const [state, setState] = useState({
    open: false,
    level: 0,
    levels: [{ ...menu, root: true }]
  })

  const store = useMemo(
    () => ({
      state,
      setOpen(open) {
        setState({
          ...state,
          open
        })
      },
      goBack() {
        setState({
          ...state,
          level: state.level - 1
        })
      },
      setSelected(item, options) {
        const level = state.level + 1
        const levels = [...state.levels]

        if (levels.length <= level) {
          levels.push(item)
        } else {
          levels[state.level] = item
        }

        setState({
          ...state,
          level,
          levels
        })

        // if (options.expandFirstItem && item.items.every(itm => itm.expanded === false)) {
        //   item.items[0].expanded = true
        // }
      }
    }),
    [state.level, state.open, state.levels]
  )

  // const store = useLocalStore(() => ({
  //   open: false,
  //   level: 0,
  //   levels: [{ ...menu, root: true }],
  //   classes: null,
  //   setSelected(item, options = {}) {
  //     store.level = store.level + 1

  //     if (store.levels.length <= store.level) {
  //       store.levels.push(item)
  //     } else {
  //       store.levels[store.level] = item
  //     }

  //     if (options.expandFirstItem && item.items.every(itm => itm.expanded === false)) {
  //       item.items[0].expanded = true
  //     }
  //   }
  // }))

  return store
}
