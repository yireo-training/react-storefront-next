import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchSuggestionItem from '../../search/SearchSuggestionItem'
import SearchSuggestionGroup from '../../search/SearchSuggestionGroup'
import Head from 'next/head'
import AmpContext from '../AmpContext'
import { Typography } from '@material-ui/core'

export const styles = theme => ({
  root: {}
})
const useStyles = makeStyles(styles, { name: 'RSFAmpSearchSuggestions' })

export default function AmpSearchSuggestions({ classes }) {
  classes = useStyles({ classes })
  const { ampState } = useContext(AmpContext)

  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-list"
          src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
        />
        <script
          async
          custom-template="amp-mustache"
          src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
        />
      </Head>
      <amp-list
        layout="fill"
        amp-bind={`src=>"/api/suggestions?q=" + (${ampState}.text ? encodeURIComponent(${ampState}.text) : '')`}
        items="groups"
        noloading
        reset-on-refresh
      >
        <template type="amp-mustache">
          <SearchSuggestionGroup
            caption="{{caption}}"
            amp-bind={`class=>{{thumbnails}} ? "${classes.thumbnailGroup}" : "${classes.group}"`}
          >
            {'{{#links}}'}
            <SearchSuggestionItem item={{ as: '{{as}}', href: '{{href}}' }}>
              <Typography>{'{{text}}'}</Typography>
            </SearchSuggestionItem>
            {'{{/links}}'}
          </SearchSuggestionGroup>
        </template>
      </amp-list>
    </>
  )
}

AmpSearchSuggestions.propTypes = {}

AmpSearchSuggestions.defaultProps = {}
