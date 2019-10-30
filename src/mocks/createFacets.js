export default function createFacets() {
  return [
    {
      name: 'Color',
      ui: 'buttons',
      facets: [
        {
          name: 'Red',
          code: 'red',
          image: {
            src: `https://via.placeholder.com/48x48/c62828?text=${encodeURIComponent(' ')}`,
            alt: 'red'
          }
        },
        {
          name: 'Green',
          code: 'green',
          image: {
            src: `https://via.placeholder.com/48x48/43a047?text=${encodeURIComponent(' ')}`,
            alt: 'blue'
          }
        },
        {
          name: 'Blue',
          code: 'blue',
          image: {
            src: `https://via.placeholder.com/48x48/1565c0?text=${encodeURIComponent(' ')}`,
            alt: 'blue'
          }
        },
        {
          name: 'White',
          code: 'white',
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
        { name: 'Small', code: 'sm' },
        { name: 'Medium', code: 'md' },
        { name: 'Large', code: 'lg' },
        { name: 'X-Large', code: 'xl' }
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
