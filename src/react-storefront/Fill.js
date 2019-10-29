import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%'
  },
  child: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    '& > *': {
      width: '100%',
      height: '100%'
    }
  }
}))

export default function Fill({ aspectRatio, children, className, ...props }) {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)} {...props}>
      <div style={{ paddingTop: `${aspectRatio * 100.0}%` }} />
      <div className={classes.child}>{children}</div>
    </div>
  )
}

Fill.defaultProps = {
  aspectRatio: 1
}
