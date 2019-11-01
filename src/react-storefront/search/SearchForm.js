import React, { useRef, useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Form from '../Form'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import qs from 'qs'
import LoadMask from '../LoadMask'
import { useAmp } from 'next/amp'
import Head from 'next/head'

export const styles = theme => ({
  root: {
    position: 'relative',
    height: '100%'
  }
})
const useStyles = makeStyles(styles, { name: 'RSFSearchForm' })

export default function SearchForm({ classes, children, action }) {
  classes = useStyles({ classes })

  const [submitting, setSubmitting] = useState(false)
  const ref = useRef()
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData(ref.current)
    const query = {}

    for (let [name, value] of data.entries()) {
      query[name] = value
    }

    const url = `${action}${action.includes('?') ? '&' : '?'}${qs.stringify(query)}`

    setSubmitting(true)
    const result = await fetch(url).then(res => res.json())
    setSubmitting(false)
    router.push(result.href, result.as)

    return false
  }

  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-list"
          src="https://cdn.ampproject.org/v0/amp-list-0.1.js"
        />
      </Head>
      <form
        ref={ref}
        action={action}
        onSubmit={handleSubmit}
        className={classes.root}
        target="_self"
      >
        <LoadMask show={submitting} transparent />
        {children}
      </form>
    </>
  )
}

SearchForm.propTypes = {}

SearchForm.defaultProps = {
  action: '/api/search'
}
