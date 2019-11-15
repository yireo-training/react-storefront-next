import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export const styles = theme => ({
  root: {
    '.rsf-po-selected &': {
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

const useStyles = makeStyles(styles, { name: 'RSFTextProductOption' })

export default function TextProductOption({
  classes,
  className,
  onClick,
  ampTapHandler,
  selected,
  label,
  buttonProps,
  skeleton
}) {
  classes = useStyles({ classes })

  if (skeleton) {
    return <Skeleton className={className} width={64} height={36} />
  }

  return (
    <Button
      onClick={onClick}
      className={clsx(className, classes.root)}
      {...ampTapHandler}
      variant={selected ? 'contained' : 'outlined'}
      color={selected ? 'primary' : 'default'}
      {...buttonProps}
    >
      {label}
    </Button>
  )
}

TextProductOption.propTypes = {}

TextProductOption.defaultProps = {
  buttonProps: {}
}
