import React from 'react'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import makeStyles from '@material-ui/core/styles/makeStyles'

const styles = theme => ({
  root: {
    fontWeight: 500,
    marginRight: 10
  }
})

const useStyles = makeStyles(styles, { name: 'RSFLabel' })

export default function Label({ classes, className, ...props }) {
  classes = useStyles({ classes })
  return <Typography {...props} className={clsx(className, classes.root)} />
}
