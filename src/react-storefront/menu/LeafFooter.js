import PropTypes from 'prop-types'

export default function LeafFooter({ render, list }) {
  if (render) {
    return render({ list })
  } else {
    return null
  }
}

LeafFooter.propTypes = {
  render: PropTypes.func
}
