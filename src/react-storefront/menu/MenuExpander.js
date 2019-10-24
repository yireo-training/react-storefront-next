import React, { useContext, useState, useEffect } from 'react'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import MenuItem from './MenuItem'
import { useAmp } from 'next/amp'
import MenuContext from './MenuContext'

export default function MenuExpander({ expanded, onClick, item, depth, sublist, ...props }) {
  const amp = useAmp()
  const { classes, expandFirstItem } = useContext(MenuContext)
  const [renderChildren, setRenderChildren] = useState(expanded || amp)

  useEffect(() => {
    if (!renderChildren) {
      setTimeout(() => setRenderChildren(true), 500)
    }
  }, [])

  if (!renderChildren) return null

  const children = (
    <List component="div" classes={{ root: classes.list }}>
      {item.items &&
        item.items.map((item, i) => (
          <MenuItem
            {...props}
            depth={depth}
            item={item}
            key={i}
            defaultExpanded={expandFirstItem && i === 0}
          />
        ))}
    </List>
  )

  if (amp) {
    return (
      <Collapse
        in={true}
        amp-bind={`class=>rsfMenu.sublist == '${sublist}' ? '${classes.visible}' : '${classes.hidden}'`}
      >
        {children}
      </Collapse>
    )
  } else {
    return (
      <Collapse
        in={expanded}
        timeout="auto"
        amp-bind={`class=>rsfMenu.sublist == '${sublist}' ? '${classes.visible}' : '${classes.hidden}'`}
      >
        {children}
      </Collapse>
    )
  }
}
