import { useContext } from 'react'
import DataBindingContext from './bind/DataBindingContext'
import PropTypes from 'prop-types'

/**
 * Returns a span whose text is pull from the specified store in react and from the field
 * of the same name provided by DataBindingProvider when rendering amp.
 */
export default function Bind({ name }) {
  const { ampState, getValue } = useContext(DataBindingContext)
  return <span amp-bind={`text=>${ampState}.${name} || ''`}>{getValue(name)}</span>
}

Bind.propTypes = {
  name: PropTypes.string.isRequired
}
