import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchSuggestionGroup from './SearchSuggestionGroup'
import SearchContext from './SearchContext'
import LoadMask from '../LoadMask'
import AmpSearchSuggestions from '../amp/search/AmpSearchSuggestions'
import { useAmp } from 'next/amp'

export const styles = theme => ({
  root: {
    flex: 1,
    overflowY: 'auto'
  },
  group: {
    margin: theme.spacing(0, 0, 2, 0)
  }
})
const useStyles = makeStyles(styles, { name: 'RSFSearchSuggestions' })

export default function SearchSuggestions({ classes }) {
  classes = useStyles({ classes })
  const { state } = useContext(SearchContext)

  if (useAmp()) {
    return <AmpSearchSuggestions classes={classes} />
  }

  return (
    <div className={classes.root}>
      <LoadMask show={state.loading} transparent />

      {state.groups &&
        state.groups.map((group, i) => (
          <div key={i} className={classes.group}>
            <SearchSuggestionGroup {...group} />
          </div>
        ))}
    </div>
  )
}

SearchSuggestions.propTypes = {}

SearchSuggestions.defaultProps = {}
