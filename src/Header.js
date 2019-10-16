import { AppBar, IconButton, Toolbar, Typography, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'

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
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            React Storefront
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
