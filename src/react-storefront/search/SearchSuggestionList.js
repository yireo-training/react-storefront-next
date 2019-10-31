import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Link from '../Link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
// import Highlight from 'react-highlighter'

export const styles = theme => ({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    '& a strong': {
      fontWeight: 'bold',
      color: 'inherit'
    }
  },
  caption: {
    textTransform: 'uppercase'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchSuggestionList' })

export default function SearchSuggestionList({ classes, caption, links }) {
  classes = useStyles({ classes })

  return (
    <div className={classes.root}>
      <Typography className={classes.caption}>{caption}</Typography>
      <ul className={classes.root}>
        {links.map((item, i) => (
          <li>
            <Typography>
              <Link as={item.as} href={item.href} skeletonProps={item.skeletonProps}>
                {item.text}
              </Link>
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

SearchSuggestionList.propTypes = {
  /**
   * An array of links to suggested searches.
   */
  links: PropTypes.array.isRequired,
  /**
   * A title for the list
   */
  caption: PropTypes.string.isRequired
}

SearchSuggestionList.defaultProps = {}
