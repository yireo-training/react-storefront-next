import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AppBar from '../src/react-storefront/AppBar'
import MenuButton from '../src/react-storefront/MenuButton'
import Spacer from '../src/react-storefront/Spacer'

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
      <Typography className={classes.title} variant="h6" noWrap>
        React Storefront
      </Typography>
      <Spacer />
      <MenuButton />
    </AppBar>
  )
}
