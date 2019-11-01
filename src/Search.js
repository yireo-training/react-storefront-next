import React, { useState } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchDrawer from 'react-storefront/search/SearchDrawer'
import SearchButton from 'react-storefront/search/SearchButton'
import SearchSuggestions from 'react-storefront/search/SearchSuggestions'
import SearchField from 'react-storefront/search/SearchField'
import SearchForm from 'react-storefront/search/SearchForm'

export default function Search() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <SearchButton onClick={() => setSearchOpen(true)} />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)}>
        <SearchForm>
          <SearchHeader>
            <SearchField />
          </SearchHeader>
          <SearchSuggestions />
        </SearchForm>
      </SearchDrawer>
    </>
  )
}
