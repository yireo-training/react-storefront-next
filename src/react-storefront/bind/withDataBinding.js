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
  return ({ bind, name, ...props }) => {
    const normalizedBind = normalizeBind(bind)
    const { ampState, getValue, setValue } = useContext(DataBindingContext)
    const boundProps = getBoundProps(normalizedBind, getValue, setValue)
    const createAmpValueExpression = getAmpValue(ampState, normalizedBind)
    const amp = useAmp()

    return (
      <Component
        {...props}
        {...boundProps}
        ampState={ampState}
        name={name || bind}
        bind={bind}
        amp={{
          state: ampState,
          getValue: createAmpValueExpression,
          bind: getAmpBind(amp, createAmpValueExpression),
          createHandler: createAmpEventHandler(amp, normalizedBind, ampState)
        }}
      />
    )
  }
}

/**
 * Creates a function that creates an amp-bind expression for a given field and prop.
 * @param {Boolean} amp True when amp is enabled
 * @param {Function} createAmpValueExpression A function that generates AMP values expressions for the current state.
 */
function getAmpBind(amp, createAmpValueExpression) {
  if (!amp) return () => ({})
  return ({ field, prop }) => ({ 'amp-bind': `${field}=>${createAmpValueExpression(prop)}` })
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
  if (!amp) return () => ({})
  return ({ event, prop = 'value', value }) => {
    const field = bind[prop][0]
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
      props[getCallback(prop)] = value => setValue(expression[0], value)
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
  return `on${capitalize(prop)}Change`
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
  return (prop = 'value') => `(${bind[prop].map(v => `${ampState}.${v}`).join('||')})`
}
