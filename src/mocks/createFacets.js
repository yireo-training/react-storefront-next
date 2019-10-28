export default function createFacets() {
  return [
    {
      name: 'Color',
      ui: 'buttons',
      facets: [
        {
          name: 'Red',
          code: 'red',
          matches: 24,
          image: {
            src: `https://via.placeholder.com/48x48/c62828?text=${encodeURIComponent(' ')}`,
            alt: 'red'
          }
        },
        {
          name: 'Green',
          code: 'green',
          matches: 10,
          image: {
            src: `https://via.placeholder.com/48x48/43a047?text=${encodeURIComponent(' ')}`,
            alt: 'blue'
          }
        },
        {
          name: 'Blue',
          code: 'blue',
          matches: 34,
          image: {
            src: `https://via.placeholder.com/48x48/1565c0?text=${encodeURIComponent(' ')}`,
            alt: 'blue'
          }
        },
        {
          name: 'White',
          code: 'white',
          matches: 34,
          image: {
            src: `https://via.placeholder.com/48x48/ffffff?text=${encodeURIComponent(' ')}`,
            alt: 'white'
          }
        }
      ]
    },
    {
      name: 'Size',
      ui: 'buttons',
      facets: [
        { name: 'Small', code: 'sm', matches: 20 },
        { name: 'Medium', code: 'md', matches: 30 },
        { name: 'Large', code: 'lg', matches: 50 },
        { name: 'X-Large', code: 'xl', matches: 9 }
      ]
    },
    {
      name: 'Type',
      ui: 'checkboxes',
      facets: [
        { name: 'New', code: 'new', matches: 100 },
        { name: 'Used', code: 'used', matches: 20 }
      ]
    }
  ]
}
