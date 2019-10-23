import React, { useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import CloseOffIcon from '@material-ui/icons/CloudOff'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: '40px',
    color: '#999'
  },
  icon: {
    fontSize: 60,
    color: '#999'
  },
  heading: {},
  message: {}
})

const useStyles = makeStyles(styles, { name: 'RSFOffline' })

/**
 * A page to display when in Offline mode
 */
export default function Offline({ classes, heading, message, Icon }) {
  classes = useStyles({ classes })

  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <Typography variant="h6" component="h1" className={classes.heading}>
        {heading}
      </Typography>
      <Typography variant="caption" className={classes.message}>
        {message}
      </Typography>
    </div>
  )
}

OfflineBanner.propTypes = {
  /**
   * Text or an element to display as the heading.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Text or an element to deplay as the message.
   */
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * An icon to display.
   */
  Icon: PropTypes.func
}

OfflineBanner.defaultProps = {
  heading: "You're offline",
  message: 'Please check your internet connection',
  Icon: CloseOffIcon
}
