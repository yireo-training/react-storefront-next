import React, { useContext } from 'react'
import MenuContext from './MenuContext'
import PropTypes from 'prop-types'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'

export default function LeafHeader({ goBack, item, parentPath }) {
  const { renderLeafHeader, classes } = useContext(MenuContext)

  const backButtonAmpProps = {
    on: `tap:AMP.setState({ rsfMenu: { list: '${parentPath}' } })`
  }

  if (renderLeafHeader) {
    return renderLeafHeader({ item, goBack, backButtonAmpProps })
  } else {
    return (
      <ListItem divider button onClick={goBack} {...backButtonAmpProps}>
        <ListItemIcon classes={{ root: classes.header }}>
          <ChevronLeft className={classes.icon} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.headerText }}
          primary={<div className={classes.headerText}>{item.text} </div>}
        />
      </ListItem>
    )
  }
}

LeafHeader.propTypes = {
  /**
   * Goes back to the previous item in the menu hierarchy
   */
  goBack: PropTypes.func,
  /**
   * The menu item being rendered
   */
  item: PropTypes.shape({
    text: PropTypes.string
  }).isRequired
}
