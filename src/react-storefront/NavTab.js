import Tab from '@material-ui/core/Tab'
import Link from './Link'
import makeStyles from '@material-ui/core/styles/makeStyles'

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 100
  },
  tab: {
    fontWeight: 'normal',
    height: 56,
    whiteSpace: 'nowrap',
    ...theme.typography.body1
  }
})

const useStyles = makeStyles(styles, { name: 'RSFNavTab' })

export default function NavTab({ classes, href, as, ...props }) {
  classes = useStyles({ classes })

  return (
    <Link className={classes.link} href={href} as={as}>
      <Tab className={classes.tab} {...props} />
    </Link>
  )
}
