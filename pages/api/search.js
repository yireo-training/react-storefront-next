export default function search(req, res) {
  res.end(
    JSON.stringify({
      href: '/s/[subcategoryId]',
      as: '/s/1'
    })
  )
}
