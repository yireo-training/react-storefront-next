/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'

export const styles = theme => ({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.typography.caption
  }
})

const useStyles = makeStyles(styles, { name: 'RSFToolbarButton' })

/**
 * A toolbar button with optional label.  Use these in your AppBar. All additional
 * props are spread to the underlying material-ui IconButton.
 */
export default function ToolbarButton({ icon, label, classes, children, ...others }) {
  const { wrap, ...buttonClasses } = useStyles({ classes })

  return (
    <IconButton classes={buttonClasses} {...others}>
      <div className={wrap}>
        {icon}
        <div>{label}</div>
      </div>
      {children}
    </IconButton>
  )
}

ToolbarButton.propTypes = {
  /**
   * The icon
   */
  icon: PropTypes.element.isRequired,

  /**
   * The label text (optional)
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}
