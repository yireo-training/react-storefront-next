import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import DataBindingContext from './bind/DataBindingContext'

export const styles = theme => ({
  selected: {
    '& button': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    }
  }
})
const useStyles = makeStyles(styles, { name: 'RSFToggleButton' })

export default function ToggleButton({ classes, selected, bind, value, ...others }) {
  const { selected: selectedClass, ...buttonClasses } = useStyles({ classes })
  const cls = isSelected => clsx({ [selectedClass]: isSelected })
  const { ampState, getValue } = useContext(DataBindingContext)

  if (selected === undefined) {
    selected = getValue(bind) === value
  }

  return (
    <div
      className={cls(selected)}
      amp-bind={`class=>${ampState}.${bind} == "${value}" ? "${cls(true)}" : "${cls(false)}"`}
    >
      <Button
        {...others}
        amp-bind=""
        classes={buttonClasses}
        variant={selected ? 'contained' : 'outlined'}
        color={selected ? 'primary' : 'default'}
      />
    </div>
  )
}

ToggleButton.propTypes = {
  /**
   * The key in AMP state from which to get the selected state
   */
  bind: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.any
}

ToggleButton.defaultProps = {}
