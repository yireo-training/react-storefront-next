import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import withDataBinding from './bind/withDataBinding'
import withDefaultHandler from './utils/withDefaultHandler'

export const styles = theme => ({
  selected: {
    '& button': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    }
  }
})
const useStyles = makeStyles(styles, { name: 'RSFToggleButton' })

function ToggleButton({
  classes,
  selected,
  amp,
  currentValue,
  onValueChange,
  value,
  onClick,
  ...others
}) {
  const { selected: selectedClass, ...buttonClasses } = useStyles({ classes })
  const cls = isSelected => clsx({ [selectedClass]: isSelected })

  const handleClick = withDefaultHandler(onClick, _e => {
    onValueChange(currentValue === value ? null : value)
  })

  if (selected === undefined) {
    selected = currentValue === value
  }

  return (
    <div
      className={cls(selected)}
      {...amp.bind({
        field: 'class',
        value: `${amp.getValue()}.id == '${value && value.id}' ? '${cls(true)}' : '${cls(false)}'`
      })}
    >
      <Button
        {...others}
        {...amp.createHandler({
          event: 'tap',
          value: `${JSON.stringify({ ...value })}`
        })}
        onClick={e => handleClick(e)}
        classes={buttonClasses}
        variant={selected ? 'contained' : 'outlined'}
        color={selected ? 'primary' : 'default'}
      />
    </div>
  )
}

ToggleButton.propTypes = {
  /**
   * The key in AMP state from which to get the selected state
   */
  bind: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.any
}

ToggleButton.defaultProps = {}

export default withDataBinding(ToggleButton)
