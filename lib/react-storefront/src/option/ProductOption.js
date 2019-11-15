import React from 'react'
import PropTypes from 'prop-types'
import withDataBinding from '../bind/withDataBinding'
import TextProductOption from './TextProductOption'
import SwatchProductOption from './SwatchProductOption'
import withDefaultHandler from '../utils/withDefaultHandler'
import get from 'lodash/get'

function ProductOption({
  value,
  selected,
  options,
  index,
  selectedOption,
  onSelectedOptionChange,
  onClick,
  variant,
  showLabel,
  amp,
  onOptionsChange,
  ...others
}) {
  if (options && index != null) {
    // will get here when used as part of a button selector
    value = options[index]
    selected = get(value, 'id') == get(selectedOption, 'id')
  }

  const handleClick = withDefaultHandler(onClick, _e => {
    if (onSelectedOptionChange) {
      onSelectedOptionChange(value === selectedOption ? null : value)
    }
  })

  const Variant = variant === 'text' ? TextProductOption : SwatchProductOption
  const selectedClassName = 'rsf-po-selected'

  return (
    <div
      className={selected ? selectedClassName : ''}
      {...amp.bind({
        attribute: 'class',
        value: `${amp.getValue('selectedOption')}.id == '${get(
          value,
          'id'
        )}' ? '${selectedClassName}' : ''`
      })}
    >
      <Variant
        {...others}
        label={showLabel ? value && value.text : undefined}
        selected={selected}
        onClick={handleClick}
        ampTapHandler={amp.createHandler({
          event: 'tap',
          prop: 'selectedOption',
          value: `${amp.getValue('selectedOption')}.id == '${get(
            value,
            'id'
          )}' ? undefined : ${amp.getValue('options')}[${index}]`
        })}
      />
    </div>
  )
}

ProductOption.propTypes = {
  /**
   * The ui variant that controls how the option is displayed
   */
  variant: PropTypes.oneOf(['text', 'swatch']).isRequired,
  /**
   * Set to `false` to hide the label text
   */
  showLabel: PropTypes.bool
}

ProductOption.defaultProps = {
  showLabel: true
}

export default withDataBinding(ProductOption)
