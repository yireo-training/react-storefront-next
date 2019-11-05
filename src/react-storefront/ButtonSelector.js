import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useAmp } from 'next/amp'
import SwatchButton from './SwatchButton'
import withDefaultHandler from './utils/withDefaultHandler'
import AmpContext from './amp/AmpContext'
import ToggleButton from './ToggleButton'

export const styles = theme => ({
  buttons: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  wrap: {
    position: 'relative',
    margin: theme.spacing(0, 0.5, 0.5, 0)
  },
  disabled: {
    backgroundColor: '#f2f2f2',
    color: '#999',
    '& img': {
      opacity: 0.5
    }
  },
  selectedName: {
    marginTop: '10px'
  },
  strikeThrough: {
    height: '7px',
    borderWidth: '2px 0',
    borderStyle: 'solid',
    borderColor: '#f2f2f2',
    backgroundColor: '#666',
    position: 'absolute',
    width: '100%',
    top: 'calc(50% - 3px)',
    borderRadius: '10px'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFButtonSelector' })

/**
 * A selector for product options rendered as a set of buttons. Buttons can either have
 * text or an image. The text for the selected option can optionally be displayed below
 * the buttons.
 *
 * This component supports AMP.
 */
export default function ButtonSelector(props) {
  let { options, name, classes } = props

  const amp = useAmp()
  const { ampState } = useContext(AmpContext)

  if (!options) return null

  classes = useStyles({ classes })

  return (
    <div className={classes.root}>
      {amp && <input type="hidden" name={name} amp-bind={`value=>${ampState}.${name}.id`} />}
      <div className={classes.buttons}>
        {options.map((option, i) => (
          <Option
            {...props}
            name={name}
            key={option.id}
            option={option}
            classes={classes}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}

function Option({
  option,
  value,
  classes,
  strikeThroughDisabled,
  strikeThroughAngle,
  buttonProps,
  onSelectionChange,
  name
}) {
  const { ampState, getValue, setValue } = useContext(AmpContext)
  if (!value) value = getValue(name)

  const handleClick = withDefaultHandler(onSelectionChange, (_e, value) => {
    if (name) {
      setValue(name, getValue(name) === value ? null : value)
    }
  })

  const props = {
    name: `${name}.id`,
    value: option.id,
    onClick: e => handleClick(e, option),
    'aria-label': option.text,
    href: option.url,
    disabled: option.disabled,
    on: `tap:AMP.setState({ ${ampState}: { ${name}: ${JSON.stringify(
      option
    )}, ${name}Interacted: true }})`,
    ...buttonProps
  }

  const ButtonComponent = option.image || option.color ? SwatchButton : ToggleButton

  return (
    <div key={option.id} className={classes.wrap}>
      <ButtonComponent
        name={`${name}.id`}
        value={option.id}
        onClick={e => handleClick(e, option)}
        aria-label={option.text}
        disabled={option.disabled}
        on={`tap:AMP.setState({ ${ampState}: { ${name}: ${JSON.stringify(
          option
        )}, ${name}Interacted: true }})`}
        color={option.color}
        {...(option.image || {})}
        {...buttonProps}
      >
        {option.text}
      </ButtonComponent>
      {option.disabled && strikeThroughDisabled && (
        <div
          className={classes.strikeThrough}
          style={{ transform: `rotate(${strikeThroughAngle}deg)` }}
        />
      )}
    </div>
  )
}

ButtonSelector.propTypes = {
  /**
   * Callback function for tab change
   * Args: event, selectedItem, index
   */
  onSelectionChange: PropTypes.func,

  /**
   * Overridable classes object to allow customization of component
   */
  classes: PropTypes.objectOf(PropTypes.string),

  /**
   * Props for displayed images. See <Image /> component for details
   */
  imageProps: PropTypes.object,

  /**
   * The name of property in amp state to bind to
   */
  name: PropTypes.string,

  /**
   * Props to apply to each `Button` element.
   */
  buttonProps: PropTypes.object,

  /**
   * Set to `true` to show a slash through the item when disabled.  Defaults to `false`
   */
  strikeThroughDisabled: PropTypes.bool,

  /**
   * The angle in degress for the disabled indicator.  Defaults to `45`.
   */
  strikeThroughAngle: PropTypes.number
}

ButtonSelector.defaultProps = {
  items: [],
  buttonProps: {},
  imageProps: {},
  strikeThroughDisabled: false,
  strikeThroughAngle: 45
}
