import React, { useMemo, useContext } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SearchResultsContext from './SearchResultsContext'

const styles = theme => ({
  matches: {
    marginLeft: '5px',
    display: 'inline'
  },
  groupLabel: {
    display: 'flex',
    alignItems: 'center'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFCheckboxFilterGroup' })

export default function CheckboxFilterGroup(props) {
  const { group, submitOnChange } = props
  const {
    pageData: { filters },
    actions: { toggleFilter }
  } = useContext(SearchResultsContext)

  const classes = useStyles()

  return useMemo(
    () => (
      <FormGroup>
        {group.facets.map((facet, i) => (
          <FormControlLabel
            key={i}
            label={
              <div className={classes.groupLabel}>
                <span>{facet.name}</span>
                <Typography variant="caption" className={classes.matches} component="span">
                  ({facet.matches})
                </Typography>
              </div>
            }
            control={
              <Checkbox
                checked={filters.indexOf(facet.code) !== -1}
                color="primary"
                onChange={() => toggleFilter(facet, submitOnChange)}
              />
            }
          />
        ))}
      </FormGroup>
    ),
    [...Object.values(props), filters]
  )
}
