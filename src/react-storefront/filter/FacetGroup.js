import React, { memo } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ExpandableSection from '../ExpandableSection'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import { useObserver } from 'mobx-react'

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

const useStyles = makeStyles(styles, { name: 'RSFFacetGroup' })

function FacetGroup({ store, group, submitOnChange, defaultExpanded }) {
  return useObserver(() => {
    const selection = []
    const classes = useStyles()

    const {
      pageData: { filters },
      actions: { toggleFilter }
    } = store

    const formGroup = (
      <FormGroup>
        {group.facets.map((facet, i) => {
          let checked = false

          if (filters.indexOf(facet.code) !== -1) {
            selection.push(facet)
            checked = true
          }

          return (
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
                  checked={checked}
                  color="primary"
                  onChange={() => toggleFilter(facet, submitOnChange)}
                />
              }
            />
          )
        })}
      </FormGroup>
    )

    let caption = null

    if (selection.length === 1) {
      caption = selection[0].name
    } else if (selection.length > 0) {
      caption = `${selection.length} selected`
    }

    return (
      <ExpandableSection title={group.name} caption={caption} defaultExpanded={defaultExpanded}>
        {formGroup}
      </ExpandableSection>
    )
  })
}

export default memo(FacetGroup)
