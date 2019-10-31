import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchSuggestionList from './SearchSuggestionList'
import SearchContext from './SearchContext'
import LoadMask from '../LoadMask'

export const styles = theme => ({
  root: {
    margin: theme.spacing(2)
  },
  group: {
    margin: theme.spacing(0, 0, 2, 0)
  }
})
const useStyles = makeStyles(styles, { name: 'RSFSearchSuggestions' })

export default function SearchSuggestions({ classes }) {
  classes = useStyles({ classes })

  const { state } = useContext(SearchContext)

  return state.loading ? (
    <LoadMask />
  ) : (
    <div className={classes.root}>
      {state.groups.map((group, i) => (
        <div className={classes.group}>
          {group.ui === 'thumbnails' ? (
            <div />
          ) : (
            <SearchSuggestionList links={group.links} caption={group.caption} />
          )}
        </div>
      ))}
    </div>
  )
}

SearchSuggestions.propTypes = {}

SearchSuggestions.defaultProps = {}
