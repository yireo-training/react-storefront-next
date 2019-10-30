import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AppBar from 'react-storefront/AppBar'
import Spacer from 'react-storefront/Spacer'
import CartButton from 'react-storefront/CartButton'
import Logo from '../src/assets/react-storefront-logo.svg'
import SearchButton from 'react-storefront/search/SearchButton'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles(theme => ({
  title: {},
  logo: {
    position: 'absolute',
    left: 10,
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

  return (
    <AppBar>
      <Container
        maxWidth="lg"
        style={{ display: 'flex', alignItems: 'center', position: 'relative', padding: 5 }}
      >
        <Logo style={{ width: 120 }} className={classes.logo} />
        <Hidden implementation="css" smUp>
          <SearchButton />
        </Hidden>
        <Spacer />
        <CartButton quantity={4} />
        {children}
      </Container>
    </AppBar>
  )
}
