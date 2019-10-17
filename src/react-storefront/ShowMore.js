import React, { useState } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'

export const styles = theme => ({
  root: {
    margin: '15px 0',
    width: '100%'
  },
  loading: {
    display: 'flex',
    height: 45,
    justifyContent: 'center'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFShowMore' })

export default function ShowMore({ loadMore, className, children, renderLoadingIcon, ...others }) {
  const amp = false
  const classes = useStyles(others)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loadMore) {
      setLoading(true)

      try {
        await loadMore()
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) {
    return <div className={clsx(classes.loading, classes.root)}>{renderLoadingIcon()}</div>
  } else {
    return (
      <Button
        variant="contained"
        color="primary"
        href={amp ? createPWAURL() : null}
        className={clsx(classes.root, className)}
        onClick={handleClick}
        {...others}
      >
        {children || 'Show More'}
      </Button>
    )
  }
}

function createPWAURL() {
  //`${app.location.pathname.replace(/\.amp/, '')}?page=1#item-${model.pageSize}`
  return ''
}

ShowMore.propTypes = {
  /**
   * A renderer for the loading icon.  Uses CircularPropgress by default.
   */
  renderLoadingIcon: PropTypes.func
}

ShowMore.defaultProps = {
  renderLoadingIcon: () => <CircularProgress />
}
