/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import VisibilitySensor from 'react-visibility-sensor'
import qs from 'qs'
import makeStyles from '@material-ui/styles/makeStyles'
import PWAContext from './PWAContext'

export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Without a minimum height and width, the container will not fire
    // the visibility change
    minHeight: 1,
    minWidth: 1
  },
  fit: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'block',
    width: '100%',
    height: '100%'
  },
  contain: {
    '& img': {
      objectFit: 'contain',
      maxHeight: '100%',
      maxWidth: '100%'
    }
  },
  fill: {
    '& img': {
      display: 'block',
      objectFit: 'contain',
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
      height: '100%'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFImage' })

/**
 * Provide amp-compatible mobile-optimized images that can be made to auto-scale to fit the parent element
 * by setting the `fill` prop, or grow/shrink while maintaining a given aspect ratio
 * by setting the `aspectRatio` prop.
 */
export default function Image({
  lazy,
  lazyOffset,
  notFoundSrc,
  height,
  width,
  quality,
  fill,
  contain,
  classes,
  className,
  aspectRatio,
  alt,
  src,
  optimize,
  ...imgAttributes
}) {
  function getOptimizedSrc() {
    if (quality || Object.keys(optimize).length > 0) {
      const options = { ...optimize, img: src }
      if (quality) options.quality = quality
      return `https://opt.moovweb.net/?${qs.stringify(options)}`
    } else {
      return src
    }
  }

  function lazyLoad(visible) {
    if (!loaded && visible) {
      setLoaded(true)
    }
  }

  function ampLayout() {
    if (contain || fill || aspectRatio) {
      return 'fill'
    } else {
      return 'intrinsic'
    }
  }

  classes = useStyles({ classes })

  const { amp, hydrating } = useContext(PWAContext)
  const [loaded, setLoaded] = useState(lazy === false || (lazy === 'ssr' && !hydrating) || amp)
  const [primaryNotFound, setPrimaryNotFound] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) {
      setPrimaryNotFound(true)
    }
  }, [])

  if (src == null) return null

  contain = contain || aspectRatio

  // Overiding `src` prop if `quality` was set
  src = getOptimizedSrc()

  if (primaryNotFound && notFoundSrc) {
    src = notFoundSrc
  }

  const assignedAttributes = {
    src,
    key: src,
    [amp ? 'class' : 'className']: clsx({
      [classes.fit]: aspectRatio != null
    }),
    layout: amp ? ampLayout() : null,
    height,
    width,
    alt
  }

  let result = (
    <div
      className={clsx(className, {
        [classes.root]: true,
        [classes.contain]: contain,
        [classes.fill]: fill
      })}
    >
      {aspectRatio && <div style={{ paddingTop: `${aspectRatio}%` }} />}
      {amp ? (
        <amp-img {...assignedAttributes} />
      ) : (
        loaded && (
          <img
            ref={ref}
            {...assignedAttributes}
            {...imgAttributes}
            onError={() => setPrimaryNotFound(true)}
          />
        )
      )}
    </div>
  )

  if (!amp && lazy) {
    result = (
      <VisibilitySensor
        active={!loaded}
        onChange={lazyLoad}
        partialVisibility
        offset={{ top: -lazyOffset, bottom: -lazyOffset }}
      >
        {result}
      </VisibilitySensor>
    )
  }

  return result
}

Image.propTypes = {
  /**
   * The URL for the image
   */
  src: PropTypes.string,

  /**
   * The URL of the image to use in case the primary image fails to load
   */
  notFoundSrc: PropTypes.string,

  /**
   * The ratio of height/width as a float.  For example: 1 when the height and width match,
   * 0.5 when height is half of the width.
   */
  aspectRatio: PropTypes.number,

  /**
   * The quality of image to retreive from 0 to 100
   */
  quality: PropTypes.number,

  /**
   * Set to true to apply object-fit:contain to the image so that it automatically
   * fits within the element's height and width.
   */
  contain: PropTypes.bool,

  /**
   * The same as contain, except images are stretched to fill the element's height and width.
   */
  fill: PropTypes.bool,

  /**
   * Set to `true` to wait until the image enters the viewport before loading it. Set to `"ssr"` to
   * only lazy load images during server side rendering.
   */
  lazy: PropTypes.oneOf(['ssr', true, false]),

  /**
   * Sets the minimum amount of pixels the image can be scrolled out of view before it
   * is lazy loaded.  Defaults to 100.  You must set `lazy` in order for this setting to take effect.
   */
  lazyOffset: PropTypes.number,

  /**
   * When specified, the image will be optimized for mobile devices by the Moovweb CDN.  Accepts the following keys:
   *
   * - quality  - A number or string containing the number for the desired quality, on a scale from 1 (worst) to 100 (best).
   * - width - A number or string containing the number for the desired pixel width.
   * - height - A number or string containing the number for the desired pixel height.
   * - format - A string containing the desired file format. Accepts "webp" or "jpeg".
   */
  optimize: PropTypes.shape({
    quality: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    format: PropTypes.oneOf(['webp', 'jpeg'])
  })
}

Image.defaultProps = {
  quality: null,
  contain: false,
  fill: false,
  lazy: false,
  lazyOffset: 100,
  optimize: {}
}
