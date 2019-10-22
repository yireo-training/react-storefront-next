import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

export default function LeafHeader({ render, classes, goBack, list, parentPath }) {
  const backButtonAmpProps = {
    on: `tap:AMP.setState({ rsfMenu: { list: '${parentPath}' } })`
  }

  if (render) {
    return render({ list, goBack, backButtonAmpProps })
  } else {
    return (
      <ListItem divider button onClick={goBack} {...backButtonAmpProps}>
        <ListItemIcon classes={{ root: classes.header }}>
          <ChevronLeft className={classes.icon} />
        </ListItemIcon>
        <ListItemText
          classes={{ root: classes.headerText }}
          primary={<div className={classes.headerText}>{list.text} </div>}
        />
      </ListItem>
    )
  }
}

LeafHeader.propTypes = {
  render: PropTypes.func,
  goBack: PropTypes.func,
  classes: PropTypes.object.isRequired,
  list: PropTypes.shape({
    text: PropTypes.string
  }).isRequired
}
