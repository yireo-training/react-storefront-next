export default function createFacets() {
  return [
    {
      name: 'Color',
      facets: [
        { name: 'Red', code: 'red', matches: 24 },
        { name: 'Green', code: 'green', matches: 10 },
        { name: 'Blue', code: 'blue', matches: 34 }
      ]
    },
    {
      name: 'Size',
      facets: [
        { name: 'Small', code: 'sm', matches: 20 },
        { name: 'Medium', code: 'md', matches: 30 },
        { name: 'Large', code: 'lg', matches: 50 },
        { name: 'X-Large', code: 'xl', matches: 9 }
      ]
    }
  ]
}
