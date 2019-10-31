import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

export const styles = theme => ({
  button: {
    color: theme.palette.primary.contrastText,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
    '& span': {
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }
  },
  buttonText: {
    border: `1px solid ${theme.palette.primary.contrastText}`,
    margin: '0 0 10px 0'
  },
  buttonFab: {
    position: 'absolute',
    right: '10px',
    top: '-28px',
    zIndex: 1
  }
})

const useStyles = makeStyles(styles, { name: 'RSFDrawerCloseButton' })

/**
 * A close button for drawers that can display text or an icon.
 */
export default function DrawerCloseButton({
  classes,
  ampState,
  onClick,
  text,
  Icon,
  fullscreen,
  ...others
}) {
  classes = useStyles({ classes })

  let ButtonElement

  if (text) {
    ButtonElement = Button
  } else if (fullscreen) {
    ButtonElement = IconButton
  } else {
    ButtonElement = props => (
      <Fab color="primary" style={{ display: open ? '' : 'none' }} {...props}>
        <Icon />
      </Fab>
    )
  }

  return (
    <ButtonElement
      color="primary"
      on={`tap:AMP.setState({ ${ampState}: { open: false } })`}
      className={clsx({
        [classes.button]: true,
        [classes.buttonText]: text != null,
        [classes.buttonFab]: text == null && !fullscreen
      })}
      onClick={onClick}
      {...others}
    >
      {text || <Icon />}
    </ButtonElement>
  )
}

DrawerCloseButton.propTypes = {
  /**
   * The name of the amp state corresponding to the drawer
   */
  ampState: PropTypes.string,

  /**
   * Fired when the button is clicked.  Call `e.preventDefault()` on the
   * provided event to prevent the drawer from closing.
   */
  onClick: PropTypes.func,

  /**
   * When set, this text will be displayed instead of an icon.
   */
  text: PropTypes.string,

  /**
   * Overrides the default icon
   */
  Icon: PropTypes.func
}

DrawerCloseButton.defaultProps = {
  Icon: ClearIcon
}
