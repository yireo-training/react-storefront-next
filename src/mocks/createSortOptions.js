export default function createSortOptions() {
  return [
    { name: 'Price - Low to High', code: 'price_asc' },
    { name: 'Price - High to Low', code: 'price_desc' },
    { name: 'Most Popular', code: 'pop' },
    { name: 'Highest Rated', code: 'rating' }
  ]
}
