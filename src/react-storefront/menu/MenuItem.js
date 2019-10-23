import React, { useContext } from 'react'
import Branch from './MenuBranch'
import Leaf from './MenuLeaf'
import MenuContext from './MenuContext'

export default function Item({ item, ...props }) {
  const { itemRenderer } = useContext(MenuContext)

  let NodeType = Leaf,
    result = null

  if (item.items) {
    NodeType = Branch
  }

  if (itemRenderer) {
    result = itemRenderer(item, item.leaf)
  }

  if (result == null) {
    result = <NodeType item={item} itemRenderer={itemRenderer} {...props} />
  }

  return result
}
