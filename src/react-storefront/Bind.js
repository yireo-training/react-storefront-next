import { useContext } from 'react'
import AmpContext from './amp/AmpContext'
import PropTypes from 'prop-types'

/**
 * Returns a span whose text is pull from the specified store in react and from the field
 * of the same name provided by PageState when rendering amp.
 */
export default function Bind({ name }) {
  const { ampState, getValue } = useContext(AmpContext)
  return <span amp-bind={`text=>${ampState}.${name} || ''`}>{getValue(name)}</span>
}

Bind.propTypes = {
  name: PropTypes.string.isRequired
}
