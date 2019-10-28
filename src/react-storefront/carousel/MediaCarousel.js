import React, { useCallback, useLayoutEffect, useState, useRef } from 'react'
import Carousel from './Carousel'
import Image from '../Image'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ReactImageMagnify from 'react-image-magnify'
import MagnifyHint from './MagnifyHint'
// import Video from '../Video'

const styles = theme => ({
  imageWrap: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain'
    }
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFMediaCarousel' })

/**
 * A carousel that displays images and videos for a product.  Specify
 * images and videos via the media prop, which should be of the form:
 *
 * ```js
 *  <MediaCarousel
 *    media={[
 *      { src: 'https://domain.com/path/to/image.jpg', alt: 'Red Shirt', type: 'image' },
 *      { src: 'https://domain.com/path/to/image.mpeg', alt: 'Demonstration', type: 'video' },
 *    ]}
 *    thumbnail={{
 *      src: 'https://domain.com/path/to/thumbnail.jpg', alt: 'thumbnail'
 *    }}
 *  />
 * ```
 *
 * To display a low-res thumbnail while high res images are loading, specify a `thumbnail` prop with `src` and `alt`
 *
 * Alternatively, you can provide a `product` prop as an object with `media` and `thumbnail` values that
 * adhere to the formats described above.
 *
 * ```js
 *  <MediaCarousel
 *    product={{
 *      media: [
 *        { src: 'https://domain.com/path/to/image.jpg', alt: 'Red Shirt', type: 'image' },
 *        { src: 'https://domain.com/path/to/image.mpeg', alt: 'Demonstration', type: 'video' },
 *      ],
 *      thumbnail: {
 *        src: 'https://domain.com/path/to/thumbnail.jpg', alt: 'thumbnail'
 *      }
 *    }}
 *  />
 * ```
 */
export default function MediaCarousel({
  product,
  thumbnail,
  media,
  imageProps,
  classes,
  magifyProps,
  ...others
}) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const styles = useStyles({ classes })
  const ref = useRef(null)
  const [over, setOver] = useState(false)

  if (product) {
    media = product.media
  }

  const timeout = useRef(null)

  const handleMouseEnter = useCallback(() => {
    timeout.current = window.setTimeout(() => {
      setOver(true)
      timeout.current = null
    }, 250)
  })

  const handleMouseLeave = useCallback(() => {
    setOver(false)

    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }
  })

  const onFullSizeImagesLoaded = useCallback(() => {
    setImagesLoaded(true)
  })

  useLayoutEffect(() => {
    setImagesLoaded(false)

    const firstImage = ref.current.querySelector('img')

    if (firstImage) {
      firstImage.addEventListener('load', onFullSizeImagesLoaded)
      return () => firstImage.removeEventListener('load', onFullSizeImagesLoaded)
    }
  }, media && media[0])

  const belowAdornments = []

  if (thumbnail && !imagesLoaded) {
    belowAdornments.push(<Image className={styles.thumbnail} fill {...thumbnail} />)
  }

  if (media && media.some(item => item.magnify)) {
    belowAdornments.push(<MagnifyHint over={over} />)
  }

  return (
    <Carousel
      ref={ref}
      belowAdornments={belowAdornments}
      classes={classes}
      {...others}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {media &&
        media.map((item, i) => (
          <Media
            onLoad={i === 0 ? onFullSizeImagesLoaded : null}
            magifyProps={magifyProps}
            {...item}
          />
        ))}
    </Carousel>
  )
}

function Media({ magifyProps, imageProps, src, alt, magnify, type = 'image' }) {
  if (type === 'video') {
    return <Video src={src} alt={alt} />
  } else if (magnify) {
    return (
      <ReactImageMagnify
        enlargedImagePosition="over"
        {...magifyProps}
        smallImage={{
          src: src,
          alt: alt,
          isFluidWidth: true
        }}
        largeImage={magnify}
      />
    )
  } else {
    return <Image key={src} src={src} alt={alt} fill {...imageProps} />
  }
}

MediaCarousel.defaultProps = {
  magifyProps: {}
}