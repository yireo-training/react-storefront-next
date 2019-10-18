import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AppBar from '../src/react-storefront/AppBar'
import MenuButton from '../src/react-storefront/MenuButton'
import Spacer from '../src/react-storefront/Spacer'
import CartButton from '../src/react-storefront/CartButton'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {},
  toolbar: {
    padding: 0,
    margin: 0
  }
}))

export default function Header() {
  const classes = useStyles()

  return (
    <AppBar>
      <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center' }}>
        <Typography className={classes.title} variant="h6" noWrap>
          React Storefront
        </Typography>
        <Spacer />
        <CartButton quantity={4} />
        <MenuButton />
      </Container>
    </AppBar>
  )
}
