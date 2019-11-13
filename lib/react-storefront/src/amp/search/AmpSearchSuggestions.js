import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import SearchSuggestionItem from '../../search/SearchSuggestionItem'
import SearchSuggestionGroup from '../../search/SearchSuggestionGroup'
import Head from 'next/head'
import DataBindingContext from '../../bind/DataBindingContext'

export const styles = theme => ({
  root: {},
  thumbnailGroup: {},
  group: {},
  container: {
    position: 'relative',
    height: '100%',
    overflowY: 'auto'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFAmpSearchSuggestions' })

export default function AmpSearchSuggestions({ classes }) {
  classes = useStyles({ classes })
  const ampState = useContext(DataBindingContext)

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
      <div className={classes.container}>
        <amp-list
          layout="fill"
          class={classes.root}
          amp-bind={`src=>"/api/suggestions?q=" + (${ampState}.text ? encodeURIComponent(${ampState}.text) : '')`}
          items="groups"
          reset-on-refresh
        >
          <template type="amp-mustache">
            <SearchSuggestionGroup
              caption="{{caption}}"
              ui="{{ui}}"
              amp-bind={`class=>{{thumbnails}} ? "${classes.thumbnailGroup}" : "${classes.group}"`}
            >
              {'{{#links}}'}
              <SearchSuggestionItem
                thumbnailProps={{
                  height: 100,
                  width: 100
                }}
                ui="{{ui}}"
                item={{
                  as: '{{as}}',
                  href: '{{href}}',
                  text: '{{text}}',
                  thumbnail: { src: '{{thumbnail.src}}', alt: '{{thumbnail.alt}}' }
                }}
              />
              {'{{/links}}'}
            </SearchSuggestionGroup>
          </template>
        </amp-list>
      </div>
    </>
  )
}

AmpSearchSuggestions.propTypes = {}

AmpSearchSuggestions.defaultProps = {}
