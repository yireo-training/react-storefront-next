import React, { useMemo, useContext } from 'react'
import SearchResultsContext from './SearchResultsContext'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SwatchButton from '../SwatchButton'
import { Hbox } from '../Box'
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  wrap: {
    margin: theme.spacing(0, 1, 1, 0)
  },
  matches: {
    display: 'inline',
    ...theme.typography.caption,
    marginLeft: 2,
    color: theme.palette.grey[700]
  },
  button: {
    fontWeight: 'normal',
    margin: theme.spacing(0, 0.5, 0.5, 0)
  }
})

const useStyles = makeStyles(styles, { name: 'RSFButtonFilterGroup' })

export default function ButtonFilterGroup(props) {
  const { group, submitOnChange } = props
  const {
    pageData: { filters },
    actions: { toggleFilter }
  } = useContext(SearchResultsContext)

  const classes = useStyles()

  return useMemo(
    () => (
      <div className={classes.root}>
        {group.facets.map((facet, i) => {
          const selected = filters.indexOf(facet.code) !== -1
          const { image, matches, name } = facet
          const handleClick = () => toggleFilter(facet, submitOnChange)

          const label = (
            <Hbox>
              <span>{name}</span>
              {matches ? <span className={classes.matches}>({matches})</span> : null}
            </Hbox>
          )

          if (image) {
            return (
              <SwatchButton
                key={i}
                classes={{ root: classes.button }}
                {...facet.image}
                selected={selected}
                onClick={handleClick}
                label={label}
              />
            )
          } else {
            return (
              <Button
                key={i}
                classes={{ root: classes.button }}
                onClick={handleClick}
                variant={selected ? 'contained' : 'outlined'}
                color={selected ? 'primary' : 'default'}
              >
                {label}
              </Button>
            )
          }
        })}
      </div>
    ),
    [filters, ...Object.values(props)]
  )
}
