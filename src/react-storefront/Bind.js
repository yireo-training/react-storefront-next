import withDataBinding from './bind/withDataBinding'
import PropTypes from 'prop-types'

/**
 * Returns a span whose text is pull from the specified store in react and from the field
 * of the same name provided by DataBindingProvider when rendering amp.
 */
function Bind({ amp, currentValue }) {
  return (
    <span
      {...amp.bind({
        field: 'text',
        value: `${amp.getValue()} || ''`
      })}
    >
      {currentValue}
    </span>
  )
}

Bind.propTypes = {
  name: PropTypes.string.isRequired
}

export default withDataBinding(Bind)
