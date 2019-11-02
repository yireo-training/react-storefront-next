import React, { memo, useContext } from 'react'
import { Vbox } from './Box'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Check as CheckedIcon } from '@material-ui/icons'
import Image from './Image'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import AmpContext from './amp/AmpContext'

export const styles = theme => ({
  root: {},
  button: {
    position: 'relative',
    marginBottom: theme.spacing(0.5),
    padding: 2,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    minWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[500],
    cursor: 'pointer',
    '&:focus': {
      outline: 0
    }
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: '50%'
  },
  '@media (hover: none)': {
    SwatchButton: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }
  },
  checkMark: {
    transition: 'opacity 0.1s linear',
    opacity: 0,
    position: 'absolute',
    zIndex: 1,
    color: 'white',
    top: 2,
    left: 2,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    opacity: 1
  },
  selectedBackground: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 2,
    height: 'calc(100% - 4px)',
    width: 'calc(100% - 4px)',
    borderRadius: '50%'
  },
  selectedLabel: {
    fontWeight: 'bold'
  },
  default: {
    height: 48,
    width: 48,
    '& svg': {
      height: 24,
      width: 24
    }
  },
  small: {
    height: 32,
    width: 32,
    '& svg': {
      height: 16,
      width: 16
    }
  },
  tiny: {
    height: 24,
    width: 24,
    '& svg': {
      height: 12,
      width: 12
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSwatchButton' })

/**
 * A button to be used for color selection that displays a image swatch of the color.
 * Extra props are spread to the underlying Material UI button.
 *
 * ```js
 *  <SwatchButton
 *    src="https://domain.com/path/to/image.png"
 *    alt="color swatch"
 *    selected
 *    label="Arctic White"
 *  />
 * ```
 */
function SwatchButton({
  name,
  value,
  selected,
  label,
  src,
  alt,
  classes,
  imageProps,
  SelectedIcon,
  variant,
  ...buttonProps
}) {
  classes = useStyles({ classes })

  const cls = isSelected =>
    clsx({
      [classes.checkMark]: true,
      [classes.selectedBackground]: true,
      [classes.root]: true,
      [classes.selected]: isSelected
    })

  const { ampState, getValue } = useContext(AmpContext)

  if (selected === undefined) {
    selected = getValue(name) == value
  }

  return (
    <Vbox className={classes.root}>
      <button
        {...buttonProps}
        type="button"
        className={clsx({
          [classes.button]: true,
          [classes[variant]]: true,
          [classes.selected]: selected
        })}
      >
        <div
          className={cls(selected)}
          amp-bind={`class=>${ampState}.${name} == "${value}" ? "${cls(true)}" : "${cls(false)}"`}
        >
          <SelectedIcon className={classes.icon} />
        </div>
        <Image
          classes={{ image: classes.image }}
          fill
          aspectRatio={1}
          src={src}
          alt={alt}
          {...imageProps}
        />
      </button>
      {label && (
        <Typography variant="caption" className={clsx({ [classes.selectedLabel]: selected })}>
          {label}
        </Typography>
      )}
    </Vbox>
  )
}

SwatchButton.propTypes = {
  /**
   * The key in AMP state from which to get the selected state
   */
  name: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.any,
  /**
   * Controls the size of the button
   */
  variant: PropTypes.string,
  /**
   * Set to `true` to mark the button as selected.
   */
  selected: PropTypes.bool,
  /**
   * Text to display below the button
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * The image URL
   */
  src: PropTypes.string,
  /**
   * Alt text for the image
   */
  alt: PropTypes.string,
  /**
   * Additional props for the image component
   */
  imageProps: PropTypes.object,
  /**
   * A custom icon element to display when a button is selected.
   */
  SelectedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

SwatchButton.defaultProps = {
  imageProps: {},
  SelectedIcon: CheckedIcon,
  variant: 'default'
}

export default memo(SwatchButton)
