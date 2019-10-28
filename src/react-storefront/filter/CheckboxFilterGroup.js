import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useObserver } from 'mobx-react'
import makeStyles from '@material-ui/core/styles/makeStyles'

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

export default function CheckboxFilterGroup({ store, group, submitOnChange }) {
  return useObserver(() => {
    const {
      pageData: { filters },
      actions: { toggleFilter }
    } = store

    const classes = useStyles()

    return (
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
    )
  })
}
