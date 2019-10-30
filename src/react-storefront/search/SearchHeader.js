import { useContext, useMemo, useRef, useState } from 'react'
import SearchContext from './SearchContext'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import { Hbox } from '../Box'
import Input from '@material-ui/core/Input'

export const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  searchField: {
    flexGrow: 1,
    border: 0,
    borderRadius: '35px',
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    height: '48px'
  },
  searchInput: {
    padding: '0 0 0 20px'
  },
  hidden: {
    display: 'none'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchHeader' })

export default function SearchHeader({
  searchButtonVariant,
  showClearButton,
  placeholder,
  classes,
  searchFieldName
}) {
  classes = useStyles({ classes })

  const context = useContext(SearchContext)
  const inputRef = useRef(null)
  const [text, setText] = useState('')

  const HideWhenEmpty = ({ children }) => (
    <div
      className={state.text.trim().length ? null : classes.hidden}
      amp-bind={`class=>rsfSearchDrawer.searchText.length > 0 ? "" : "${classes.hidden}"`}
    >
      {children}
    </div>
  )

  const handleInputFocus = () => {
    inputRef.current.setSelectionRange(0, inputRef.current.value.length)
  }

  const SearchButton = ({ Component, ...others }) => (
    <Component
      rel="search"
      type="submit"
      disabled={!amp && search.text.trim().length === 0}
      {...others}
    >
      <SearchIcon />
    </Component>
  )

  return (
    <div className={classes.root}>
      <Hbox>
        <Input
          type="text"
          name={searchFieldName}
          placeholder={placeholder}
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={handleInputFocus}
          inputProps={{
            'amp-bind': 'value=>rsfSearchDrawer.searchText'
          }}
          on="input-debounced:AMP.setState({ rsfSearchDrawer: { searchText: rsfSearchDrawer.___moov_submitting ? rsfSearchDrawer.searchText : event.value } })"
          disableUnderline
          inputRef={inputRef}
          classes={{
            root: classes.searchField,
            input: classes.searchInput
          }}
          endAdornment={
            showClearButton ? (
              <HideWhenEmpty>
                <IconButton
                  onClick={this.clearSearch}
                  className={classes.searchReset}
                  rel="clear"
                  on="tap:AMP.setState({ rsfSearchDrawer: { searchText: '' }})"
                >
                  <ClearIcon rel="clear" />
                </IconButton>
              </HideWhenEmpty>
            ) : (
              searchButtonVariant === 'icon' && (
                <SearchButton Component={Button} className={classes.searchButton} />
              )
            )
          }
        />
        {searchButtonVariant === 'fab' && (
          <HideWhenEmpty>
            <SearchButton Component={Fab} className={classes.searchFab} />
          </HideWhenEmpty>
        )}
      </Hbox>
    </div>
  )
}

SearchHeader.propTypes = {
  searchFieldName: PropTypes.string
}

SearchHeader.defaultProps = {
  searchFieldName: 'search'
}
