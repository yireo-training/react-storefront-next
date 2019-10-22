import { useLocalStore } from 'mobx-react'

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
    }
  }))

  return store
}
