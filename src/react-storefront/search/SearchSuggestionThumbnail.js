import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import { Vbox } from '../Box'
import { Typography } from '@material-ui/core'
import Image from '../Image'

export const styles = theme => ({
  thumbnail: {
    marginBottom: '10px'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchSuggestionThumbnail' })

export default function SearchSuggestionThumbnail({ classes, item }) {
  classes = useStyles({ classes })

  return (
    <Vbox>
      <Image className={classes.thumbnail} {...item.thumbnail} />
      <Typography>{item.text}</Typography>
    </Vbox>
  )
}

SearchSuggestionThumbnail.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    thumbnail: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  })
}

SearchSuggestionThumbnail.defaultProps = {}
