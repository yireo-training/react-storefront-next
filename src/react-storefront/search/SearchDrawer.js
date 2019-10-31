import SearchContext from './SearchContext'
import Drawer from '../drawer/Drawer'
import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchProvider from './SearchProvider'

export const styles = theme => ({})

const useStyles = makeStyles(styles, { name: 'RSFSearch' })

export default function SearchDrawer({ classes, open, onClose, children }) {
  classes = useStyles({ classes })

  return (
    <SearchProvider onClose={onClose}>
      <Drawer classes={classes} open={open} anchor="bottom" onClose={onClose} fullscreen>
        {children}
      </Drawer>
    </SearchProvider>
  )
}

SearchDrawer.propTypes = {}

SearchDrawer.defaultProps = {}
