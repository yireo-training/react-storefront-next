import React, { useRef, useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Form from '../Form'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import qs from 'qs'
import LoadMask from '../LoadMask'

export const styles = theme => ({
  root: {
    position: 'relative'
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
    <Form ref={ref} action={action} onSubmit={handleSubmit} className={classes.root}>
      <LoadMask show={submitting} transparent />
      {children}
    </Form>
  )
}

SearchForm.propTypes = {}

SearchForm.defaultProps = {
  action: '/api/search'
}
