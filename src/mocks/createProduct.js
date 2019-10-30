export default function createProduct(id) {
  return {
    id,
    name: `Product ${id}`,
    price: `$${(id % 10) * 10 + 0.99}`,
    rating: (10 - (id % 10)) / 2.0,
    thumbnail: {
      src: `https://via.placeholder.com/600x600/cccccc?text=${encodeURIComponent('Product ' + id)}`,
      alt: `Product ${id}`
    },
    media: [
      {
        src: `https://via.placeholder.com/600x600/cccccc?text=${encodeURIComponent(
          'Product ' + id
        )}`,
        alt: `Product ${id}`,
        magnify: {
          height: 1200,
          width: 1200,
          src: `https://via.placeholder.com/1200x1200/cccccc?text=${encodeURIComponent(
            'Product ' + id
          )}`
        }
      },
      {
        src: `https://via.placeholder.com/600x600/ff0000?text=${encodeURIComponent(
          'Product ' + id
        )}`,
        alt: `Product ${id}`,
        magnify: {
          height: 1200,
          width: 1200,
          src: `https://via.placeholder.com/1200x1200/ff0000?text=${encodeURIComponent(
            'Product ' + id
          )}`
        }
      },
      {
        src: `https://via.placeholder.com/600x600/00ff00?text=${encodeURIComponent(
          'Product ' + id
        )}`,
        alt: `Product ${id}`,
        magnify: {
          height: 1200,
          width: 1200,
          src: `https://via.placeholder.com/1200x1200/00ff00?text=${encodeURIComponent(
            'Product ' + id
          )}`
        }
      }
    ],
    sizes: [
      { id: 'sm', text: 'SM' },
      { id: 'md', text: 'MD' },
      { id: 'lg', text: 'LG' },
      { id: 'xl', text: 'XL', disabled: true },
      { id: 'xxl', text: 'XXL' }
    ],
    colors: [
      {
        id: 'red',
        text: 'RED',
        image: {
          src: `https://via.placeholder.com/1200x1200/ff0000?text=${encodeURIComponent(' ')}`,
          alt: 'red'
        }
      },
      {
        id: 'blue',
        text: 'BLUE',
        image: {
          src: `https://via.placeholder.com/1200x1200/0000ff?text=${encodeURIComponent(' ')}`,
          alt: 'blue'
        }
      },
      {
        id: 'green',
        text: 'GREEN',
        image: {
          src: `https://via.placeholder.com/1200x1200/00ff00?text=${encodeURIComponent(' ')}`,
          alt: 'green'
        }
      }
    ]
  }
}
