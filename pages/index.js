import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0)
  }
}))

export default function Index() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <div className={classes.main}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Welcome to your new React Storefront app.
        </Typography>
        <p>
          Here you'll find mock home, category, subcategory, product, and cart pages that you can
          use as a starting point to build your PWA.
        </p>
        <p>Happy coding!</p>
      </div>
    </Container>
  )
}

export const config = { amp: 'hybrid' }
