import SearchContext from './SearchContext'
import Drawer from '../drawer/Drawer'
import SearchHeader from './SearchHeader'
import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export const styles = theme => ({
  paper: {
    height: '100vh'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearch' })

export default function Search({ classes }) {
  classes = useStyles({ classes })

  const { state, toggleOpen } = useContext(SearchContext)

  return (
    <Drawer
      classes={classes}
      open={state.open}
      anchor="bottom"
      onRequestClose={() => toggleOpen(false)}
    >
      <SearchHeader />
      <div>Body</div>
    </Drawer>
  )
}

Search.propTypes = {}

Search.defaultProps = {}
