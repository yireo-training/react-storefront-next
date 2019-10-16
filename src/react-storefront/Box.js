/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'

/**
 * A flex container.  All additional props are spread to the style of the underlying div.
 */
export const styles = theme => ({
  root: {
    display: 'flex'
  },
  split: {
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

const useStyles = makeStyles(styles, 'RSFBox')

export default function Box({ className, classes, split = false, children, style, ...other }) {
  classes = useStyles({ classes })

  return (
    <div
      className={clsx(classes.root, className, { [classes.split]: split })}
      style={{ ...other, ...style }}
    >
      {children}
    </div>
  )
}

Box.propTypes = {
  /**
   * CSS classes to apply
   */
  classes: PropTypes.object,

  /**
   * True to split items on opposite sides of the box by applying justify-content: 'space-between'
   */
  split: PropTypes.bool
}

/**
 * A flex container with horizontal layout. All additional props are spread to the style
 * of the underlying div.
 */
export function Hbox(props) {
  props = { ...props, flexDirection: 'row' }
  return <Box alignItems="center" {...props} />
}

Hbox.propTypes = {
  /**
   * CSS classes to apply
   */
  classes: PropTypes.object,

  /**
   * True to split items on opposite sides of the box by applying justify-content: 'space-between'
   */
  split: PropTypes.bool
}

/**
 * A flex container with vertical layout. All additional props are spread to
 * the style of the underlying div.
 */
export function Vbox(props) {
  props = { ...props, flexDirection: 'column' }
  return <Box {...props} />
}

Vbox.propTypes = {
  /**
   * CSS classes to apply
   */
  classes: PropTypes.object,

  /**
   * True to split items on opposite sides of the box by applying justify-content: 'space-between'
   */
  split: PropTypes.bool
}
