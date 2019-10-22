import React from 'react'
import Branch from './MenuBranch'
import Leaf from './MenuLeaf'
import { useObserver } from 'mobx-react'

export default function Item({ item, itemRenderer, ...props }) {
  return useObserver(() => {
    let NodeType = Leaf,
      result = null

    if (item.items) {
      NodeType = Branch
    }

    if (itemRenderer) {
      result = itemRenderer(item, item.leaf)
    }

    if (result == null) {
      result = (
        <NodeType
          expandFirstItem={props.expandFirstItem}
          itemContentRenderer={props.itemContentRenderer}
          itemRenderer={itemRenderer}
          isFirstItem={props.isFirstItem}
          trackSelected={props.trackSelected}
          ExpandIcon={props.ExpandIcon}
          CollapseIcon={props.CollapseIcon}
          theme={props.theme}
          item={item}
          index={props.index}
          depth={props.depth}
          useExpandersAtLevel={props.useExpandersAtLevel}
          depth={props.depth}
        />
      )
    }

    return result
  })
}
