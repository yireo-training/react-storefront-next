import React, { memo } from 'react'
import LoadMask from '../LoadMask'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { Hbox } from '../Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import FacetGroup from './FacetGroup'
import { useObserver } from 'mobx-react'

/**
 * UI for filtering an instance of SearchResultModelBase.  This component can be used on its own, or you can use
 * FilterButton to automatically display this component in a drawer that slides up from the bottom of the viewport.
 */
export const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  facetGroups: {
    overflow: 'auto',
    overflowX: 'hidden',
    flex: '1',
    position: 'relative'
  },
  footer: {
    backgroundColor: theme.palette.secondary.main,
    padding: '12px 20px',
    color: 'white',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemsFound: {
    color: theme.palette.secondary.contrastText
  },
  title: {
    ...theme.typography.subtitle1,
    marginBottom: `12px`
  },
  noMargins: {
    margin: 0
  }
})

const useStyles = makeStyles(styles, { name: 'RSFFilter' })

function Filter({
  expandAll,
  store,
  loading,
  queryParam,
  submitOnChange,
  classes,
  title,
  onViewResultsClick
}) {
  return useObserver(() => {
    classes = useStyles({ classes })

    const {
      pageData: { facets, filters, filtersChanged }
    } = store

    return (
      <div className={classes.root}>
        {title ? <div className={classes.title}>{title}</div> : null}
        <div className={classes.facetGroups}>
          <LoadMask show={loading} transparent align="top" />
          {facets &&
            facets.map((group, i) => (
              <FacetGroup
                group={group}
                key={i}
                store={store}
                expandAll={expandAll}
                submitOnChange={submitOnChange}
              />
            ))}
        </div>
        {filtersChanged && !submitOnChange && (
          <Hbox className={classes.footer} split>
            <Typography variant="subtitle1" className={classes.itemsFound}>
              {filters.length || 'No'} filter
              {filters.length === 1 ? '' : 's'} selected
            </Typography>
            <Button variant="contained" size="large" color="default" onClick={onViewResultsClick}>
              View Results
            </Button>
          </Hbox>
        )}
      </div>
    )
  })
}

Filter.propTypes = {
  /**
   * A store returned from `react-storefront/hooks/useSearchResultsStore`
   */
  store: PropTypes.object.isRequired,

  /**
   * CSS classes
   */
  classes: PropTypes.object,

  /**
   * A function to call when the user clicks the button to view updated results.  The default behavior can be
   * canceled by calling `preventDefault` on the passed in event.  The event is passed as the only argument.
   */
  onViewResultsClick: PropTypes.func,

  /**
   * The query string parameter that should be updated when filters are changed.  The value will be an array
   * of codes for each selected facet.  Defaults to "filters"
   */
  queryParam: PropTypes.string,

  /**
   * An optional title to display at the top of the component.
   */
  title: PropTypes.string,

  /**
   * Set to false to remove the default left and right margins. Defaults to `true`.
   */
  margins: PropTypes.bool,

  /**
   * Set to `true` to expand all groups on initial render
   */
  expandAll: PropTypes.bool,

  /**
   * Set to `true` to refresh the results when the user toggles a filter
   */
  submitOnChange: PropTypes.bool
}

Filter.defaultProps = {
  onViewResultsClick: Function.prototype,
  queryParam: 'filters',
  margins: true,
  submitOnChange: false
}

export default memo(Filter)
