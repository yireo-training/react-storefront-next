import SearchContext from './SearchContext'
import Drawer from '../drawer/Drawer'
import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchProvider from './SearchProvider'
import { useAmp } from 'next/amp'
import AmpDrawer from '../amp/AmpDrawer'
import PageState from '../PageState'

export const styles = theme => ({
  paper: {
    display: 'flex'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearch' })

export default function SearchDrawer({ classes, open, onClose, children }) {
  classes = useStyles({ classes })

  return (
    <SearchProvider onClose={onClose}>
      <PageState id="rsfSearchDrawer" state={{ open: false, text: '' }}>
        {useAmp() ? (
          <AmpDrawer anchor="bottom" fullscreen>
            {children}
          </AmpDrawer>
        ) : (
          <Drawer classes={classes} open={open} anchor="bottom" onClose={onClose} fullscreen>
            {children}
          </Drawer>
        )}
      </PageState>
    </SearchProvider>
  )
}

SearchDrawer.propTypes = {}

SearchDrawer.defaultProps = {}
