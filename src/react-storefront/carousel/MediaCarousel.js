import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import Carousel from './Carousel'
import Image from '../Image'
import { makeStyles } from '@material-ui/core/styles'
import ReactImageMagnify from 'react-image-magnify'
import MagnifyHint from './MagnifyHint'
import AmpContext from '../amp/AmpContext'
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
function MediaCarousel(props) {
  let {
    baseURL,
    thumbnail,
    imageProps,
    classes,
    colorKey = 'color',
    productIdKey = 'product.id',
    mediaKey = 'product.media',
    magifyProps,
    ...others
  } = props
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const styles = useStyles({ classes })
  const ref = useRef(null)
  const [over, setOver] = useState(false)
  const { getValue } = useContext(AmpContext)

  const productId = getValue(productIdKey)
  const color = getValue(colorKey)

  const [media, setMedia] = useState(() => getValue(mediaKey))

  useEffect(() => {
    const fetchMedia = async (productId, color) => {
      const res = await fetch(
        `http://localhost:3000${baseURL}?productId=${encodeURIComponent(productId)}&color=${encodeURIComponent(color.id)}`
      )

      setMedia((await res.json()).media)
    }

    if (color && color.media) {
      setMedia(color.media)
    } else if (color) {
      fetchMedia(productId, color)
    }
  }, [color && color.id])

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

  useEffect(() => {
    const firstImage = ref.current.querySelector('img')

    if (firstImage) {
      firstImage.addEventListener('load', onFullSizeImagesLoaded)
      return () => firstImage.removeEventListener('load', onFullSizeImagesLoaded)
    }
  }, [])

  const belowAdornments = []

  if (thumbnail && !imagesLoaded) {
    belowAdornments.push(<Image key="thumbnail" className={styles.thumbnail} fill {...thumbnail} />)
  }

  if (media && media.full && media.full.some(item => item.magnify)) {
    belowAdornments.push(<MagnifyHint key="magnify-hint" over={over} />)
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
        media.full &&
        media.full.map((item, i) => (
          <Media
            key={i}
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

export default React.memo(MediaCarousel)
