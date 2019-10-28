export default function createProduct(id) {
  return {
    id,
    name: `Product ${id}`,
    price: (id % 10) * 10 + 0.99,
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
    colors: {
      options: [
        {
          id: 'red',
          text: 'RED'
        },
        {
          id: 'blue',
          text: 'BLUE'
        },
        {
          id: 'green',
          text: 'GREEN'
        }
      ],
      selected: {
        id: 'red',
        text: 'RED'
      }
    }
  }
}
