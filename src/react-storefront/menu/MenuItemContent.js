import React, { useContext } from 'react'
import { ListItemText, ListItemIcon, CircularProgress } from '@material-ui/core'
import MenuContext from './MenuContext'
import MenuExpanderIcon from './MenuExpanderIcon'

export default function ItemContent(props) {
  const { itemContentRenderer, classes } = useContext(MenuContext)
  let { item, leaf } = props
  let contents

  if (itemContentRenderer) {
    contents = itemContentRenderer(item, leaf)
  }

  if (contents) {
    return contents
  } else if (leaf) {
    return (
      <>
        {item.image && (
          <ListItemIcon>
            <img className={classes.listItemImage} alt={item.text} src={item.image} />
          </ListItemIcon>
        )}
        <ListItemText primary={item.text} disableTypography />
      </>
    )
  } else {
    return (
      <>
        {item.image && (
          <ListItemIcon>
            <img className={classes.listItemImage} alt={item.text} src={item.image} />
          </ListItemIcon>
        )}
        <ListItemText className={classes.listItem} primary={item.text} disableTypography />
        <ListItemIcon className={classes.listItemIcon}>
          {item.loading ? (
            <CircularProgress
              style={{ height: 24, width: 24, padding: 4 }}
              color="secondary"
              className={classes.loadingIcon}
            />
          ) : (
            <MenuExpanderIcon {...props} />
          )}
        </ListItemIcon>
      </>
    )
  }
}
