import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import Cart from '@material-ui/icons/ShoppingCart'
import ToolbarButton from './ToolbarButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Badge from '@material-ui/core/Badge'

export const styles = theme => ({
  badge: {
    border: '2px solid white',
    padding: '0 4px'
  },
  icon: {},
  link: {
    color: 'inherit'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFCartButton' })

export default function CartButton({
  classes,
  cart,
  href,
  as,
  server,
  onClick,
  icon,
  quantity,
  ...buttonProps
}) {
  classes = useStyles({ classes })
  const cartIcon = icon || <Cart className={classes.icon} />

  return (
    <Link
      className={classes.link}
      href={href}
      as={as}
      server={server}
      onClick={onClick}
      anchorProps={{ 'data-th': 'cart-link' }}
    >
      <ToolbarButton aria-label="Cart" color="inherit" {...buttonProps}>
        <Badge classes={{ badge: classes.badge }} badgeContent={quantity} color="primary">
          {cartIcon}
        </Badge>
      </ToolbarButton>
    </Link>
  )
}

CartButton.propTypes = {
  /**
   * The url path to cart.  Defaults to "/cart"
   */
  href: PropTypes.string,

  /**
   * Set to true to force server side navigation.  Defaults to false
   */
  server: PropTypes.bool,

  /**
   * CSS classes
   */
  classes: PropTypes.object,

  /**
   * Optional Custom cart icon
   */
  icon: PropTypes.element
}

CartButton.defaultProps = {
  href: '/cart'
}
