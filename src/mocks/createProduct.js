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
    images: [
      {
        src: `https://via.placeholder.com/600x600/cccccc?text=${encodeURIComponent(
          'Product ' + id
        )}`,
        alt: `Product ${id}`
      },
      {
        src: `https://via.placeholder.com/600x600/ff0000?text=${encodeURIComponent(
          'Product ' + id
        )}`,
        alt: `Product ${id}`
      },
      {
        src: `https://via.placeholder.com/600x600/00ff00?text=${encodeURIComponent(
          'Product ' + id
        )}`,
        alt: `Product ${id}`
      }
    ],
    colors: {
      options: [
        {
          id: 'red',
          text: 'red'
        },
        {
          id: 'blue',
          text: 'blue'
        },
        {
          id: 'green',
          text: 'green'
        }
      ]
    }
  }
}
