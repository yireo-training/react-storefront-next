import colors, { colorForId } from './colors'
import capitalize from 'lodash/capitalize'

export default function createProduct(id, numColors = 4) {
  const color = colorForId(id)

  return {
    id,
    url: `/p/${id}`,
    name: `Product ${id}`,
    price: `$${(id % 10) * 10 + 0.99}`,
    rating: (10 - (id % 10)) / 2.0,
    thumbnail: {
      src: `https://via.placeholder.com/400x400/${colors[color].background}/${
        colors[color].foreground
      }?text=${encodeURIComponent('Product ' + id)}`,
      alt: `Product ${id}`
    },
    media: {
      full: [color, 'red', 'blue'].map(key => ({
        src: `https://via.placeholder.com/600x600/${colors[key].background}/${
          colors[key].foreground
        }?text=${encodeURIComponent('Product ' + id)}`,
        alt: `Product ${id}`,
        magnify: {
          height: 1200,
          width: 1200,
          src: `https://via.placeholder.com/1200x1200/${colors[key].background}/${
            colors[key].foreground
          }?text=${encodeURIComponent('Product ' + id)}`
        }
      })),
      thumbnails: []
    },
    sizes: [
      { id: 'sm', text: 'SM' },
      { id: 'md', text: 'MD' },
      { id: 'lg', text: 'LG' },
      { id: 'xl', text: 'XL', disabled: true },
      { id: 'xxl', text: 'XXL' }
    ],
    descriptions: '',
    specs: '',
    colors: Object.keys(colors)
      .slice(0, numColors)
      .map(name => ({
        text: capitalize(name),
        id: name,
        image: {
          src: `https://via.placeholder.com/48x48/${
            colors[name].background
          }?text=${encodeURIComponent(' ')}`,
          alt: name
        },
        media: {
          full: [name].map(key => ({
            src: `https://via.placeholder.com/600x600/${colors[key].background}/${
              colors[key].foreground
            }?text=${encodeURIComponent('Product ' + id)}`,
            alt: `Product ${id}`,
            magnify: {
              height: 1200,
              width: 1200,
              src: `https://via.placeholder.com/1200x1200/${colors[key].background}/${
                colors[key].foreground
              }?text=${encodeURIComponent('Product ' + id)}`
            }
          })),
          thumbnails: [color, 'red', 'blue'].map(key => ({
            src: `https://via.placeholder.com/400x400/${
              colors[key].background
            }?text=${encodeURIComponent(`Product ${id}`)}`,
            alt: key
          })),
          thumbnail: [name].map(key => ({
            src: `https://via.placeholder.com/400x400/${colors[key].background}/${
              colors[key].foreground
            }?text=${encodeURIComponent('Product ' + id)}`,
            alt: `Product ${id}`
          }))[0]
        }
      }))
  }
}
