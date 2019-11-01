import React, { useState, useRef, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import withDefaultHandler from '../utils/withDefaultHandler'
import SearchContext from './SearchContext'
import { Hbox } from '../Box'
import { Input, IconButton } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import SearchSubmitButton from './SearchSubmitButton'
import { Fab, Button } from '@material-ui/core'
import AmpContext from '../amp/AmpContext'
import clsx from 'clsx'

export const styles = theme => ({
  root: {
    flexGrow: 1,
    border: 0,
    borderRadius: '35px',
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    height: '48px'
  },
  input: {
    padding: '0 0 0 20px'
  },
  searchFab: {
    height: '48px',
    width: '48px',
    marginLeft: '10px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary
  },
  hidden: {
    display: 'none'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSearchField' })

/**
 * A search text field.  All other props are spread to the underlying Material UI `Input` element.
 */
export default function SearchField({
  classes,
  onChange,
  submitButtonVariant,
  showClearButton,
  searchFieldName,
  ...others
}) {
  classes = useStyles({ classes })
  const inputRef = useRef(null)
  const { fetchSuggestions } = useContext(SearchContext)
  const [text, setText] = useState('')
  const { ampState } = useContext(AmpContext)

  const HideWhenEmpty = ({ children }) => (
    <div
      className={text.trim().length ? null : classes.hidden}
      amp-bind={`class=>${ampState}.text.length > 0 ? "" : "${classes.hidden}"`}
    >
      {children}
    </div>
  )

  const handleInputFocus = () => {
    inputRef.current.setSelectionRange(0, inputRef.current.value.length)
  }

  const handleChange = withDefaultHandler(onChange, e => {
    const text = e.target.value
    setText(text)
    fetchSuggestions(text)
  })

  const handleClearClick = () => {
    const text = ''
    setText(text)
    fetchSuggestions(text)
  }

  return (
    <Hbox>
      <Input
        type="text"
        value={text}
        onChange={handleChange}
        onFocus={handleInputFocus}
        inputProps={{
          'amp-bind': `value=>${ampState}.text`
        }}
        on={`input-debounced:AMP.setState({ ${ampState}: { text: ${ampState}.___moov_submitting ? ${ampState}.text : event.value } })`}
        disableUnderline
        inputRef={inputRef}
        classes={{
          root: classes.root,
          input: classes.input
        }}
        endAdornment={
          showClearButton ? (
            <HideWhenEmpty>
              <IconButton
                onClick={handleClearClick}
                className={classes.searchReset}
                rel="clear"
                on={`tap:AMP.setState({ ${ampState}: { text: '' }})`}
              >
                <ClearIcon rel="clear" />
              </IconButton>
            </HideWhenEmpty>
          ) : (
            submitButtonVariant === 'icon' && (
              <SearchSubmitButton Component={Button} className={classes.searchButton} text={text} />
            )
          )
        }
        {...others}
      />
      {submitButtonVariant === 'fab' && (
        <HideWhenEmpty>
          <SearchSubmitButton Component={Fab} className={classes.searchFab} text={text} />
        </HideWhenEmpty>
      )}
    </Hbox>
  )
}

SearchField.propTypes = {
  /**
   * The type of submit button to display
   */
  submitButtonVariant: PropTypes.oneOf(['icon', 'fab']),
  /**
   * `true` to show the clear button when text is entered.
   */
  showClearButton: PropTypes.bool
}

SearchField.defaultProps = {
  submitButtonVariant: 'fab',
  showClearButton: true,
  placeholder: 'Search',
  name: 'q'
}
