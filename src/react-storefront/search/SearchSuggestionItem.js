import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Link from '../Link'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import Image from '../Image'

export const styles = theme => ({
  root: {
    margin: theme.spacing(2, 0),
    listStyle: 'none',
    padding: 0
  },
  thumbnailWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  thumbnail: {
    marginBottom: '10px'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchSuggestionItem' })

export default function SearchSuggestionItem({ classes, item, ui, children }) {
  classes = useStyles({ classes })

  return (
    <li className={classes.root}>
      <Link as={item.as} href={item.href} skeletonProps={item.skeletonProps}>
        {children ? (
          children
        ) : (
          <div className={ui === 'thumbnails' ? classes.thumbnailWrap : null}>
            {item.thumbnail && <Image className={classes.thumbnail} {...item.thumbnail} />}
            <Typography>{item.text}</Typography>
          </div>
        )}
      </Link>
    </li>
  )
}

SearchSuggestionItem.propTypes = {}

SearchSuggestionItem.defaultProps = {}
