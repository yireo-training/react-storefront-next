import colors from './colors'
import capitalize from 'lodash/capitalize'

export default function createFacets() {
  return [
    {
      name: 'Color',
      ui: 'buttons',
      facets: Object.keys(colors).map(name => ({
        name: capitalize(name),
        code: `color:${name}`,
        image: {
          src: `https://via.placeholder.com/48x48/${
            colors[name].background
          }?text=${encodeURIComponent(' ')}`,
          alt: name
        }
      }))
    },
    {
      name: 'Size',
      ui: 'buttons',
      facets: [
        { name: 'Small', code: 'size:sm' },
        { name: 'Medium', code: 'size:md' },
        { name: 'Large', code: 'size:lg' },
        { name: 'X-Large', code: 'size:xl' }
      ]
    },
    {
      name: 'Type',
      ui: 'checkboxes',
      facets: [
        { name: 'New', code: 'type:new', matches: 100 },
        { name: 'Used', code: 'type:used', matches: 20 }
      ]
    }
  ]
}
