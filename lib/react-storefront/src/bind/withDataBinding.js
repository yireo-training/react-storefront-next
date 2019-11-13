import { useContext } from 'react'
import DataBindingContext from '../bind/DataBindingContext'
import { useAmp } from 'next/amp'
import isObject from 'lodash/isObject'
import capitalize from 'lodash/capitalize'

/**
 * A higher-order function that adds 2-way databinding to a component.
 *
 * This provides the foundation for making components that can read and write state
 * in both React and AMP using a single API.
 *
 * For example, given a SizeField component that allows the user to choose a product size, but doesn't work in AMP:
 *
 * ```js
 * <SizeField value={product.size} onChange={size => updateStore({ product: { size: value })}/>
 * ```
 *
 * Wrapping it in `withDataBinding(SizeField)` would give you the ability to do this instead, which would work in AMP and React:
 *
 * ```js
 * <SizeField bind="product.size"/>
 * ```
 *
 * @param {Function} Component
 * @return {Function}
 */
export default function withDataBinding(Component) {
  const Wrapped = ({ bind, name, ...props }) => {
    const normalizedBind = normalizeBind(bind)
    const { ampState, getValue, setValue } = useContext(DataBindingContext)
    const boundProps = getBoundProps(normalizedBind, getValue, setValue)
    const createAmpValueExpression = getAmpValue(ampState, normalizedBind)
    const amp = useAmp()

    if (!name && typeof bind === 'string') {
      name = bind
    }

    return (
      <Component
        {...props}
        {...boundProps}
        name={name}
        bind={normalizedBind}
        amp={{
          state: ampState,
          getValue: createAmpValueExpression,
          bind: getAmpBind(amp, bind, createAmpValueExpression),
          createHandler: createAmpEventHandler(amp, normalizedBind, ampState)
        }}
      />
    )
  }

  Wrapped.propTypes = Component.propTypes
  return Wrapped
}

/**
 * Creates a function that creates an amp-bind expression for a given field and prop.
 * @param {Boolean} amp True when amp is enabled
 * @param {Object} bind The bind prop
 * @param {Function} createAmpValueExpression A function that generates AMP values expressions for the current state.
 * @return {Object} A props object to spread
 */
function getAmpBind(amp, bind, createAmpValueExpression) {
  if (!amp || !bind) return () => ({})
  return ({ attribute, prop, value }) => ({
    'amp-bind': `${attribute}->${value !== undefined ? value : createAmpValueExpression(prop)}`
  })
}

/**
 * Creates a function that returns an event handler expression that updates AMP state in response to a given event.
 * The function is passed the event name, the prop that determins the part of AMP state to set, and a value expression.
 * @param {Boolean} amp True when amp is enabled
 * @param {Object} bind The normalized bind expression
 * @param {String} ampState The amp state id
 * @return {Function}
 */
function createAmpEventHandler(amp, bind, ampState) {
  if (!amp || Object.keys(bind).length === 0) return () => ({})

  return ({ event, prop = 'value', value }) => {
    const expressions = bind[prop]
    if (!expressions) {
      console.warn(
        `could not create AMP event handler for prop ${prop}. No prop with that name was found.`
      )
      return {}
    }
    const field = expressions[0]
    return { on: `${event}:AMP.setState({ ${ampState}: { ${field}: ${value} } })` }
  }
}

/**
 * Converts the following forms of bind:
 *
 * bind="someValue"
 *
 * bind={['preferredValue', 'defaultValue']}
 *
 * bind={{
 *   src: 'thumbnail.src',
 *   alt: 'thumbnail.alt'
 * }}
 *
 * to:
 *
 * bind={{
 *   src: ['thumbnail.src'],
 *   alt: ['thumbnail.alt']
 * }}
 *
 * @param {Object|String[]|String} bind The raw bind prop value
 * @return {Object}
 */
function normalizeBind(bind) {
  if (!bind) return {}

  if (!isObject(bind) || Array.isArray(bind)) {
    bind = { value: bind }
  }

  for (let key in bind) {
    bind[key] = normalizeBindValue(bind[key])
  }

  return bind
}

/**
 * Ensures that the specified value expression is an array
 * @param {String|String[]} value
 * @return {String[]}
 */
function normalizeBindValue(value) {
  if (Array.isArray(value)) {
    return value
  } else {
    return [value]
  }
}

/**
 * Creates value and event handler props for each bound property.  In other words,
 * for `bind="value"`, returns:
 *
 * ```js
 * {
 *   value: (the value)
 *   onValueChange: (function to update the value)
 * }
 * ```
 *
 * @param {Object} bind
 * @param {Function} getValue
 * @param {Function} setValue
 * @return {Object}
 */
function getBoundProps(bind, getValue, setValue) {
  const props = {}

  for (let prop in bind) {
    const expression = bind[prop]
    props[prop] = getBoundValue(expression, getValue)

    if (expression.length === 1) {
      props[getCallback(prop)] = value => {
        setValue(expression[0], value)
      }
    }
  }

  return props
}

/**
 * Gets the name of the event callback
 * @param {String} prop
 * @return {String}
 */
function getCallback(prop) {
  const [first, ...rest] = prop
  return `on${capitalize(first)}${rest.join('')}Change`
}

/**
 * Gets the current value in the store for a binding
 * @param {String[]} expressions
 * @param {Function} getValue
 */
function getBoundValue(expressions, getValue) {
  for (let expression of expressions) {
    const value = getValue(expression)

    if (value != null) {
      return value
    }
  }
  return null
}

/**
 * Returns an expression to get a value from the AMP state.
 * @param {String} ampState The amp state id
 * @param {Object} bind The bind expressions
 * @return {String}
 */
function getAmpValue(ampState, bind) {
  return (prop = 'value') => {
    if (!bind[prop]) {
      return null
    } else if (bind[prop].length === 1) {
      return `${ampState}.${bind[prop]}`
    } else {
      return `(${bind[prop].map(v => `${ampState}.${v}`).join('||')})`
    }
  }
}
