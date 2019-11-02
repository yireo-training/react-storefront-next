/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { useContext } from 'react'
import { Add, Remove } from '@material-ui/icons'
import { IconButton, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import PWAContext from './PWAContext'
import AmpContext from './amp/AmpContext'

export const styles = theme => ({
  root: {
    backgroundColor: theme.palette.divider,
    border: 'none',
    width: '110px',
    padding: 0
  },
  icon: {
    fontSize: '1.3125rem',
    position: 'relative'
  },
  button: {
    height: '36px',
    width: '36px',
    padding: 0
  },
  input: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    padding: 0
  },
  focused: {
    backgroundColor: theme.palette.divider
  },
  underline: {
    '&::before': {
      display: 'none'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFQuantitySelector' })

/**
 * A quantity selector with plus and minus buttons. Any extra props are spread to the
 * underlying Material UI input element.
 */
export default function QuantitySelector({
  name,
  classes,
  addIcon,
  subtractIcon,
  value,
  minValue,
  maxValue,
  analytics,
  inputProps,
  ariaLabel,
  onChange,
  ...other
}) {
  classes = useStyles({ classes })
  const { amp } = useContext(PWAContext)
  const { ampState, getValue, setValue } = useContext(AmpContext)
  const { quantitySelector, icon, button, ...inputClasses } = classes

  const controlled = value !== undefined

  if (!controlled) value = getValue(name)

  const bindProps = {
    inputProps: {
      'aria-label': ariaLabel,
      name,
      ...inputProps,
      'amp-bind': `value=>${ampState}.${name}`
    },
    [amp ? 'readOnly' : 'disabled']: true
  }

  function handleChange(value) {
    if (value >= minValue && value <= maxValue) {
      onChange(value)

      if (!controlled) {
        setValue(name, value)
      }
    }
  }

  return (
    <>
      <Input
        startAdornment={
          <IconButton
            size="small"
            classes={{ root: button }}
            onClick={() => handleChange(value - 1)}
            aria-label={`add one ${ariaLabel}`}
            on={`tap:AMP.setState({ ${ampState}: { ${name}: max(${minValue}, (${ampState}.${name} || ${value}) - 1) } })`}
          >
            {subtractIcon || <Remove classes={{ root: icon }} />}
          </IconButton>
        }
        endAdornment={
          <IconButton
            size="small"
            classes={{ root: button }}
            onClick={() => handleChange(value + 1)}
            aria-label={`subtract one ${ariaLabel}`}
            on={`tap:AMP.setState({ ${ampState}: { ${name}: min(${maxValue}, (${ampState}.${name} || ${value}) + 1) } })`}
          >
            {addIcon || <Add classes={{ root: icon }} />}
          </IconButton>
        }
        onChange={handleChange}
        value={value}
        classes={{
          underline: classes.underline,
          ...inputClasses
        }}
        {...bindProps}
        {...other}
      />
    </>
  )
}

QuantitySelector.propTypes = {
  /**
   * The name to apply to the input when rendering AMP.
   */
  name: PropTypes.string,

  /**
   * CSS classes
   */
  classes: PropTypes.object,

  /**
   * The plus icon
   */
  addIcon: PropTypes.element,

  /**
   * The minus icon
   */
  subtractIcon: PropTypes.element,

  /**
   * The current value
   */
  value: PropTypes.number,

  /**
   * The minimum value.  Defaults to 1.
   */
  minValue: PropTypes.number,

  /**
   * The maximum value.  Defaults to 100.
   */
  maxValue: PropTypes.number,

  /**
   * Called when the value is changed.  The new value is passed as the only argument
   */
  onChange: PropTypes.func,

  /**
   * The accessibility label.  Add and subtract button aria-label values are derived from this as "add one {ariaLabel}" and "subtract one {ariaLabel}"
   */
  ariaLabel: PropTypes.string
}

QuantitySelector.defaultProps = {
  name: 'quantity',
  onChange: Function.prototype,
  minValue: 1,
  maxValue: 100,
  ariaLabel: 'quantity'
}
