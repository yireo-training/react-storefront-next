import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Hbox } from '../Box'

export const styles = theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: '12px 20px',
    color: 'white',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemsFound: {
    color: theme.palette.secondary.contrastText
  }
})

const useStyles = makeStyles(styles, { name: 'RSFFilterFooter' })

export default function FilterFooter({ classes, store, submitOnChange, onViewResultsClick }) {
  classes = useStyles({ classes })

  const {
    pageData: { filters, filtersChanged }
  } = store

  return (
    filtersChanged &&
    !submitOnChange && (
      <Hbox className={classes.root} justify="space-between">
        <Typography variant="subtitle1" className={classes.itemsFound}>
          {filters.length || 'No'} filter
          {filters.length === 1 ? '' : 's'} selected
        </Typography>
        <Button variant="contained" size="large" color="default" onClick={onViewResultsClick}>
          View Results
        </Button>
      </Hbox>
    )
  )
}
