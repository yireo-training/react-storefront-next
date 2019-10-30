import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'

export const styles = theme => ({
  icon: {
    color: theme.palette.action.active
  },
  large: {
    fontSize: '28px'
  }
})

const useStyles = makeStyles({ name: 'RSFSearchButton' })

export default function SearchButton({ children, classes, search, ...other }) {
  return (
    <IconButton
      aria-label="Search"
      color="inherit"
      classes={{ label: classes.large }}
      on="tap:AMP.setState({ rsfSearch: { open: true }})"
      {...other}
    >
      {children || <Search className={classes.icon} />}
    </IconButton>
  )
}
