import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Button } from '@material-ui/core'
import clsx from 'clsx'
import SearchResultsContext from './SearchResultsContext'
import VisibilitySensor from 'react-visibility-sensor'

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

const VARIANTS = {
  BUTTON: 'button',
  INFINITE: 'infinite'
}

const useStyles = makeStyles(styles, { name: 'RSFShowMore' })

/**
 * A control that handles loading the next page of results in a search results
 * page or PLP.  This component can either display a "Show More" button:
 *
 * ```js
 * <ShowMore variant="button"/>
 * ```
 * ... or can produce an "infinite scroll" effect that loads more records when the user
 * scrolls within a configured offset from the bottom of the page:
 *
 * ```js
 * <ShowMore variant="infinite" infiniteLoadOffset={200}/>
 * ```
 *
 * This component should always be used inside a `<SearchResultsProvider/>`.
 *
 * This component relies on the following properties being defined in `pageData` in the page store:
 *
 * * `page` - The current page number
 * * `totalPages` - The total number of pages
 */
export default function ShowMore({
  className,
  children,
  variant,
  infiniteLoadOffset,
  renderLoadingIcon,
  ...others
}) {
  const amp = false
  const classes = useStyles(others)
  const [loading, setLoading] = useState(false)
  const { actions, pageData } = useContext(SearchResultsContext)

  if (pageData && pageData.page >= pageData.totalPages - 1) return null

  async function fetchMore() {
    if (!loading) {
      setLoading(true)

      try {
        await actions.fetchMore()
      } finally {
        setLoading(false)
      }
    }
  }

  function handleVisible(isVisible) {
    if (isVisible) {
      fetchMore()
    }
  }

  if (variant === VARIANTS.INFINITE && !amp) {
    return (
      <VisibilitySensor
        onChange={handleVisible}
        partialVisibility
        offset={{ bottom: -infiniteLoadOffset }}
      >
        <div className={classes.loading}>{renderLoadingIcon()}</div>
      </VisibilitySensor>
    )
  } else {
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
            onClick={fetchMore}
            {...others}
          >
            {children || 'Show More'}
          </Button>
        )}
      </div>
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
  renderLoadingIcon: PropTypes.func,
  /**
   * Which variant to use. One of 'button' or 'infinite'.
   *
   * When variant is set to 'button':
   *   A button is rendered with contents of {props.children} or 'Show More'.
   *
   * When variant is set to 'infinite':
   *   The loading icon is rendered and contents of next page loaded when user
   *   scrolls to the end of the page.
   *
   * In AMP the 'button' variant is always used.
   */
  variant: PropTypes.oneOf([VARIANTS.BUTTON, VARIANTS.INFINITE]),
  /**
   * Minimum amount of pixels from the bottom of the page to where the user has
   * scrolled before the new page is loaded. Used in conjunction with 'infinite'
   * variant. Defaults to 100.
   */
  infiniteLoadOffset: PropTypes.number
}

ShowMore.defaultProps = {
  renderLoadingIcon: () => <CircularProgress />,
  variant: VARIANTS.BUTTON,
  infiniteLoadOffset: 100
}
