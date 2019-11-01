import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'react-storefront/AppBar'
import Spacer from 'react-storefront/Spacer'
import CartButton from 'react-storefront/CartButton'
import Logo from '../src/assets/react-storefront-logo.svg'
import Search from './Search'
import { Hidden, Container } from '@material-ui/core'
import Menu from 'react-storefront/menu/Menu'
import MenuButton from 'react-storefront/menu/MenuButton'
import createMenu from '../src/mocks/createMenu'
import Link from 'react-storefront/Link'

const menu = createMenu()

const useStyles = makeStyles(theme => ({
  title: {},
  logo: {
    position: 'absolute',
    left: 10,
    top: 0,
    [theme.breakpoints.down('xs')]: {
      left: '50%',
      marginLeft: '-60px'
    }
  },
  toolbar: {
    padding: 0,
    margin: 0
  }
}))

export default function Header({ children }) {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <AppBar>
        <Container
          maxWidth="lg"
          style={{ display: 'flex', alignItems: 'center', position: 'relative', padding: 5 }}
        >
          <Link href="/">
            <Logo style={{ width: 120, height: 58 }} className={classes.logo} />
          </Link>
          <Hidden implementation="css" smUp>
            <Search />
          </Hidden>
          <Spacer />
          <CartButton quantity={4} />
          <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </Container>
      </AppBar>
      <Menu
        align="right"
        useExpanders
        root={menu}
        open={menuOpen}
        expandFirstItem
        // itemContentRenderer={() => <div>content</div>}
        // itemRenderer={() => <div>sdfsd</div>}
        // renderLeafHeader={() => <div>leaf header</div>}
        // renderLeafFooter={() => <div>leaf footer</div>}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
