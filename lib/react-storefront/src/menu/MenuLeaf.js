import React, { useContext } from 'react'
import { ListItem } from '@material-ui/core'
import clsx from 'clsx'
import MenuItemContent from './MenuItemContent'
import Link from '../link/Link'
import MenuContext from './MenuContext'

function MenuLeaf({ item, trackSelected, ...others }) {
  const { close, classes } = useContext(MenuContext)

  return (
    <Link
      href={item.href}
      as={item.as}
      className={classes.link}
      server={item.server}
      state={item.state ? () => JSON.parse(item.state) : null}
      onClick={close}
    >
      <ListItem
        button
        divider
        selected={trackSelected && app.location.pathname === item.url.replace(/\?.*/, '')}
        classes={{
          root: clsx(classes.listItem, classes.leaf, item.className)
        }}
      >
        <MenuItemContent {...others} item={item} showExpander={false} leaf />
      </ListItem>
    </Link>
  )
}

// export default MenuLeaf
export default React.memo(MenuLeaf)
