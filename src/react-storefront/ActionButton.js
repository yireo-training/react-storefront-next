import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

export const styles = theme => ({
  label: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    textTransform: 'none'
  },
  caption: {
    textTransform: 'none',
    fontWeight: 'bold'
  },
  button: {
    boxShadow: 'none',
    backgroundColor: theme.palette.grey[200]
  },
  value: {
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipses',
    marginLeft: '10px'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFActionButton' })

/**
 * This button class displays a label and value.
 *
 * Example:
 *
 * ```js
 *  <ActionButton label="Sort" value="Lowest Price" onClick={openSortMenu}/>
 * ```
 */
export default function ActionButton({ label, value, children, classes, ...props }) {
  const {
    caption: captionClass,
    value: valueClass,
    button: buttonClass,
    ...otherClasses
  } = useStyles({ classes })

  return (
    <Button
      variant="contained"
      classes={{
        contained: clsx(buttonClass, otherClasses.contained),
        ...otherClasses
      }}
      {...props}
    >
      <Typography variant="button" className={captionClass}>
        {label}
      </Typography>
      <Typography variant="caption" className={valueClass}>
        {value}
      </Typography>
    </Button>
  )
}

ActionButton.propTypes = {
  /**
   * The label to display on the left side of the button
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * The value to display on the right side of the button
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}
