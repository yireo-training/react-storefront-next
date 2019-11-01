import React, { memo } from 'react'
import { Vbox } from './Box'
import Image from './Image'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CheckedIcon from '@material-ui/icons/Check'
import clsx from 'clsx'
import PropTypes from 'prop-types'

export const styles = theme => ({
  root: {},
  button: {
    marginBottom: theme.spacing(0.5),
    padding: 2,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    minWidth: 0,
    borderColor: theme.palette.grey[500]
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: '50%'
  },
  SwatchButtonLabel: {
    height: 36,
    width: 36,
    display: 'block',
    position: 'relative',
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
    top: 0,
    left: 0,
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
    height: 28,
    width: 28,
    borderRadius: '50%'
  },
  selectedLabel: {
    fontWeight: 'bold'
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
  selected,
  label,
  src,
  alt,
  classes,
  imageProps,
  SelectedIcon,
  ...buttonProps
}) {
  classes = useStyles({ classes })

  return (
    <Vbox className={classes.root}>
      <Button
        {...buttonProps}
        classes={{
          ...buttonProps.classes,
          root: clsx({
            [classes.button]: true,
            [classes.selected]: selected
          }),
          label: classes.SwatchButtonLabel
        }}
        variant="outlined"
        disableRipple
      >
        <div className={clsx({ [classes.checkMark]: true, [classes.selected]: selected })}>
          <div className={classes.selectedBackground}>{<SelectedIcon />}</div>
        </div>
        <Image classes={{ image: classes.image }} fill src={src} alt={alt} {...imageProps} />
      </Button>
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
  selected: false,
  imageProps: {},
  SelectedIcon: CheckedIcon
}

export default memo(SwatchButton)
