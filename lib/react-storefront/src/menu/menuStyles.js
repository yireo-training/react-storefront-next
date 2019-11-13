export default theme => ({
  drawer: {
    zIndex: theme.zIndex.modal + 20,
    display: 'flex',
    flexDirection: 'column',
    borderTop: `${theme.headerHeight}px solid transparent`,
    'body.moov-safari &': {
      // Turning off momentum scrolling on iOS here to fix frozen body issue
      // Source: https://moovweb.atlassian.net/browse/PRPL-342
      '-webkit-overflow-scrolling': 'auto'
    }
  },

  list: {
    flex: 'none',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '100%',
    padding: 0
  },

  ampList: {
    flex: 'none',
    overflowX: 'hidden',
    padding: 0
  },

  ampBody: {
    overflowY: 'auto',
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
    flex: '1 1 0%',
    transition: 'transform ease-out .2s'
  },

  hiddenLeft: {
    transform: `translateX(-${theme.drawerWidth}px)`
  },

  hiddenRight: {
    transform: `translateX(${theme.drawerWidth}px)`
  },

  inFocus: {
    transform: 'translateX(0px)'
  },

  listPadding: {
    padding: 0
  },

  header: {
    position: 'absolute',
    left: '10px',
    top: '12px'
  },

  icon: {
    marginRight: '0',
    width: 24
  },

  headerText: {
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: theme.typography.body1.fontSize
  },

  bodyWrap: {
    display: 'flex',
    flexDirection: 'row',
    transition: 'all ease-out .2s',
    maxHeight: '100%'
  },

  hidden: {
    display: 'none'
  },

  visible: {
    display: 'block'
  },

  listItem: {
    textTransform: 'uppercase',
    lineHeight: '1.5',
    fontSize: theme.typography.body1.fontSize
  },

  link: {
    textDecoration: 'none',
    color: 'inherit'
  },

  listItemImage: {
    width: '40px',
    height: '40px',
    marginRight: 0
  },

  listItemIcon: {
    marginRight: 0,
    minWidth: 0
  },

  expander: {
    backgroundColor: `${theme.palette.primary.paper} !important`
  },

  leaf: {
    textTransform: 'none',
    ...theme.typography.body1
  },

  expanded: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    color: theme.palette.secondary.contrastText,
    '& svg': {
      color: theme.palette.secondary.contrastText
    }
  },

  drawerFixed: {
    top: 0,
    height: '100vh',
    borderTop: 'none'
  },

  modal: {},

  loadingIcon: {
    display: 'block'
  }
})
