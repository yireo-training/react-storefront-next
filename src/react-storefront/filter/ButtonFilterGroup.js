import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useObserver } from 'mobx-react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Vbox } from '../Box'
import Image from '../Image'
import clsx from 'clsx'
import CheckedIcon from '@material-ui/icons/CheckCircle'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  wrap: {
    margin: theme.spacing(0, 1, 1, 0)
  },
  matches: {
    marginLeft: '5px',
    display: 'inline'
  },
  button: {
    fontWeight: 'normal',
    marginBottom: theme.spacing(0.5)
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: '50%'
  },
  imageButtonLabel: {
    height: 48,
    width: 48,
    display: 'block',
    position: 'relative',
    borderRadius: '50%'
  },
  imageButton: {
    padding: 3,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    minWidth: 0
  },
  checkMark: {
    transition: 'opacity 0.1s linear',
    opacity: 0,
    position: 'absolute',
    zIndex: 1,
    color: 'white',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    opacity: 1
  },
  selectedBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 24,
    width: 24,
    borderRadius: '50%'
  },
  selectedLabel: {
    fontWeight: 'bold'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFButtonFilterGroup' })

export default function ButtonFilterGroup({ store, group, submitOnChange }) {
  return useObserver(() => {
    const {
      pageData: { filters },
      actions: { toggleFilter }
    } = store

    const classes = useStyles()

    return (
      <div className={classes.root}>
        {group.facets.map((facet, i) => {
          let selected = filters.indexOf(facet.code) !== -1
          const image = facet.image

          return (
            <Vbox className={classes.wrap} key={i}>
              <Button
                classes={{
                  root: clsx({
                    [classes.button]: true,
                    [classes.imageButton]: facet.image != null
                  }),
                  label: clsx({
                    [classes.imageButtonLabel]: facet.image != null
                  })
                }}
                disableRipple={image != null}
                className={classes.button}
                variant={selected ? (image ? 'text' : 'contained') : image ? 'text' : 'outlined'}
                color={selected ? 'primary' : 'default'}
                onClick={() => toggleFilter(facet, submitOnChange)}
              >
                {image ? (
                  <>
                    <div
                      className={clsx({ [classes.checkMark]: true, [classes.selected]: selected })}
                    >
                      <div className={classes.selectedBackground}>
                        <CheckedIcon />
                      </div>
                    </div>
                    <Image classes={{ image: classes.image }} fill {...image} />
                  </>
                ) : (
                  facet.name
                )}
              </Button>
              {facet.image ? (
                <Typography
                  variant="caption"
                  className={clsx({ [classes.selectedLabel]: selected })}
                >
                  {facet.name}
                </Typography>
              ) : null}
            </Vbox>
          )
        })}
      </div>
    )
  })
}
