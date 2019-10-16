import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Image from './Image'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'

export const styles = theme => ({
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-4px'
  },
  button: {
    position: 'relative',
    '& button': {
      border: `1px solid ${theme.palette.divider}`,
      padding: 0,
      margin: '4px',
      width: '60px',
      minWidth: '60px',
      height: '40px',
      minHeight: '40px',
      boxShadow: 'none'
    }
  },
  buttonWithImage: {
    '& button': {
      width: '50px',
      minWidth: '50px',
      height: '50px',
      minHeight: '50px'
    }
  },
  selectedImage: {
    '& button': {
      borderWidth: '2px',
      borderColor: theme.typography.body1.color
    }
  },
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
  },
  imageLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '5px'
  },
  image: {
    height: '100%',
    width: '100%'
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
 *
 * ```js
 *  const model = useLocalStore({
 *    selected: 'md',
 *    options: [
 *      { id: 'sm', text: 'SM' }
 *      { id: 'md', text: 'MD' }
 *      { id: 'lg', text: 'LG' }
 *    ]
 *  })
 *
 *  const sizeSelector = (
 *    <ButtonSelector model={model}/>
 *  )
 * ```
 */
export default function ButtonSelector(props) {
  let { amp, options, ampStateId, name, showSelectedText, classes } = props

  if (!options) return null

  classes = useStyles({ classes })

  return (
    <div className={classes.root}>
      {amp && (
        <input
          type="hidden"
          name={name}
          value={model.selected ? model.selected.id : ''}
          amp-bind={`value=>${ampStateId}.${name}.selected.id`}
        />
      )}
      <div className={classes.buttons}>
        {options.map((option, i) => (
          <Option {...props} key={option.id} option={option} classes={classes} index={i} />
        ))}
      </div>
      {showSelectedText && (
        <Typography
          variant="caption"
          component="div"
          className={classes.selectedName}
          amp-bind={`text=>${ampStateId}.${name}.selected.text`}
        >
          {model.selected && model.selected.text}
        </Typography>
      )}
    </div>
  )
}

function Option({
  index,
  option,
  value,
  classes,
  strikeThroughDisabled,
  strikeThroughAngle,
  imageProps,
  buttonProps,
  ampStateId,
  onSelectionChange,
  name
}) {
  const selected = value === option
  let children = option.text

  if (option.image) {
    children = (
      <Image
        src={option.image}
        className={classes.image}
        fill
        {...imageProps}
        alt={option.alt || option.text}
      />
    )
  } else if (option.color) {
    children = <div className={classes.image} style={{ backgroundColor: option.color }} />
  }

  function handleClick(e, item) {
    if (onSelectionChange) {
      onSelectionChange(e, item, index)

      if (e.isDefaultPrevented()) {
        return
      }
    }
  }

  function createButtonClass(isSelected, { image, color }) {
    const { button, buttonWithImage, selectedImage, selected } = classes
    const swatch = (image || color) != null

    return clsx({
      [button]: true,
      [buttonWithImage]: swatch,
      [selectedImage]: isSelected && swatch,
      [selected]: isSelected && !swatch
    })
  }

  return (
    <div
      key={option.id}
      className={createButtonClass(selected, option)}
      amp-bind={`class=>${ampStateId}.${name}.selected.id=="${option.id}" ? "${createButtonClass(
        true,
        option
      )}" : "${createButtonClass(false, option)}"`}
    >
      <Button
        onClick={e => handleClick(e, option)}
        aria-label={option.text}
        href={option.url}
        disabled={option.disabled}
        on={`tap:AMP.setState({ ${ampStateId}: { ${name}: { selected: ${JSON.stringify(
          option
        )} }, ${name}Interacted: true }})`}
        classes={{
          label: option.image || option.color ? classes.imageLabel : null,
          disabled: classes.disabled
        }}
        {...buttonProps}
      >
        {children}
      </Button>
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
   * Props for button. See <Button /> component for details
   */
  buttonProps: PropTypes.object,

  /**
   * Set to true to show the name of the selected option in a caption below the buttons
   */
  showSelectedText: PropTypes.bool,

  /**
   * The name of property in amp state to bind to
   */
  name: PropTypes.string,

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
  showSelectedText: false,
  strikeThroughDisabled: false,
  strikeThroughAngle: 45
}
