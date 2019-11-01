import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '../Link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchSuggestionThumbnail from './SearchSuggestionThumbnail'

export const styles = theme => ({
  root: {
    listStyle: 'none',
    margin: theme.spacing(0, 0, 2, 0),
    padding: 0,
    '& a strong': {
      fontWeight: 'bold',
      color: 'inherit'
    }
  },
  caption: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0, 0, 1, 0)
  },
  list: {
    padding: 0,
    margin: theme.spacing(0, 0, 4, 0)
  },
  item: {
    margin: theme.spacing(2, 0),
    listStyle: 'none',
    padding: 0
  },
  thumbnails: {
    display: 'flex',
    listStyle: 'none',
    margin: '0 -15px',
    padding: '0 10px',
    overflowX: 'auto',
    '& > li': {
      margin: '5px'
    },
    '& img': {
      height: '120px'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchSuggestionGroup' })

export default function SearchSuggestionGroup({ classes, ui, caption, links }) {
  classes = useStyles({ classes })

  return (
    <div className={classes.root}>
      <Typography className={classes.caption}>{caption}</Typography>
      <ul
        className={clsx({
          [classes.list]: ui === 'list',
          [classes.thumbnails]: ui === 'thumbnails'
        })}
      >
        {links.map((item, i) => (
          <li key={i} className={classes.item}>
            <Link as={item.as} href={item.href} skeletonProps={item.skeletonProps}>
              {ui === 'thumbnails' ? (
                <SearchSuggestionThumbnail item={item} />
              ) : (
                <Typography>{item.text}</Typography>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

SearchSuggestionGroup.propTypes = {
  /**
   * An array of links to suggested searches.
   */
  links: PropTypes.array.isRequired,
  /**
   * A title for the list
   */
  caption: PropTypes.string.isRequired
}

SearchSuggestionGroup.defaultProps = {}
