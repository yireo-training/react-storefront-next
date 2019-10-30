import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Image from './Image'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'
import { useAmp } from 'next/amp'
import SwatchButton from './SwatchButton'

export const styles = theme => ({
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-4px'
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
  let { options, ampStateId, name, showSelectedText, classes } = props

  const amp = useAmp()

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
  buttonProps,
  ampStateId,
  onSelectionChange,
  updateStore,
  name
}) {
  if (!value) value = {}

  if (!onSelectionChange) {
    onSelectionChange = (_e, value) => {
      if (updateStore && name) {
        updateStore(store => ({
          ...store,
          pageData: {
            ...store.pageData,
            [name]: value
          }
        }))
      }
    }
  }

  const selected = value.id === option.id

  function handleClick(e, item) {
    if (onSelectionChange) {
      onSelectionChange(e, item, index)

      if (e.isDefaultPrevented()) {
        return
      }
    }
  }

  const props = {
    onClick: e => handleClick(e, option),
    'aria-label': option.text,
    href: option.url,
    disabled: option.disabled,
    on: `tap:AMP.setState({ ${ampStateId}: { ${name}: { selected: ${JSON.stringify(
      option
    )} }, ${name}Interacted: true }})`,
    ...buttonProps
  }

  function createButtonClass(selected) {
    return clsx({
      [classes.button]: true,
      [classes.selected]: selected
    })
  }

  return (
    <div key={option.id} className={classes.wrap}>
      {option.image || option.color ? (
        <SwatchButton
          selected={selected}
          {...(option.image || {})}
          color={option.color}
          {...props}
        />
      ) : (
        <Button
          variant={selected ? 'contained' : 'outlined'}
          color={selected ? 'primary' : 'default'}
          {...props}
        >
          {option.text}
        </Button>
      )}
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
