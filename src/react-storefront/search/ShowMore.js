import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import SearchResultsContext from './SearchResultsContext'

export const styles = theme => ({
  root: {
    margin: '15px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      flex: 1
    }
  },
  loading: {
    display: 'flex',
    height: 45,
    justifyContent: 'center'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFShowMore' })

export default function ShowMore({ className, children, renderLoadingIcon, ...others }) {
  const amp = false
  const classes = useStyles(others)
  const [loading, setLoading] = useState(false)
  const { actions } = useContext(SearchResultsContext)

  async function handleClick() {
    setLoading(true)

    try {
      await actions.fetchMore()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={clsx(classes.root, className)}>
      {loading ? (
        <div className={classes.loading}>{renderLoadingIcon()}</div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          href={amp ? createPWAURL() : null}
          className={classes.button}
          onClick={handleClick}
          {...others}
        >
          {children || 'Show More'}
        </Button>
      )}
    </div>
  )
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
