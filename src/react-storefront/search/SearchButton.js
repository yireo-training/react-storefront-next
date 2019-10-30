import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Search from '@material-ui/icons/Search'
import SearchContext from './SearchContext'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withDefaultHandler from '../utils/withDefaultHandler'

export const styles = theme => ({
  icon: {
    color: theme.palette.action.active
  },
  large: {
    fontSize: '28px'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchButton' })

export default function SearchButton({ children, onClick, classes, search, ...other }) {
  classes = useStyles({ classes })

  const { toggleOpen } = useContext(SearchContext)
  const handleClick = withDefaultHandler(onClick, () => toggleOpen(true))

  return (
    <IconButton
      aria-label="Search"
      color="inherit"
      classes={{ label: classes.large }}
      on="tap:AMP.setState({ rsfSearch: { open: true }})"
      onClick={handleClick}
      {...other}
    >
      {children || <Search className={classes.icon} />}
    </IconButton>
  )
}
