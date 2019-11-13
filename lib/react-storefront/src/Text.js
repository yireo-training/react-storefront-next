import withDataBinding from './bind/withDataBinding'
import PropTypes from 'prop-types'

/**
 * Returns a span whose text is pull from the specified store in react and from the field
 * of the same name provided by DataBindingProvider when rendering amp.
 */
function Text({ amp, value }) {
  return (
    <span
      {...amp.bind({
        attribute: 'text',
        value: `${amp.getValue()} || ''`
      })}
    >
      {value}
    </span>
  )
}

Text.propTypes = {}

export default withDataBinding(Text)
