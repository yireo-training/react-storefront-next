import MenuContext from './MenuContext'
import { useLocalStore } from 'mobx-react'
import { toJS } from 'mobx'

export function useMenuStore(menu) {
  const store = useLocalStore(() => ({
    open: false,
    level: 0,
    levels: [{ ...menu, root: true }],
    classes: null,
    setSelected(item, options = {}) {
      store.level = store.level + 1

      if (store.levels.length <= store.level) {
        store.levels.push(item)
      } else {
        store.levels[store.level] = item
      }

      if (options.expandFirstItem && item.items.every(itm => itm.expanded === false)) {
        item.items[0].expanded = true
      }
    }
  }))

  return store
}
