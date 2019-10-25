import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AppBar from './react-storefront/AppBar'
import Spacer from './react-storefront/Spacer'
import CartButton from './react-storefront/CartButton'

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

export default function Header({ children }) {
  const classes = useStyles()

  return (
    <AppBar>
      <Container maxWidth="lg" style={{ display: 'flex', alignItems: 'center' }}>
        <Typography className={classes.title} variant="h6" noWrap>
          React Storefront
        </Typography>
        <Spacer />
        <CartButton quantity={4} />
        {children}
      </Container>
    </AppBar>
  )
}