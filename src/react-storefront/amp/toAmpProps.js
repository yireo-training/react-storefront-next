export default function toAmpProps(props) {
  const ampProps = {}

  for (let key in props) {
    ampProps[key] = `{{${key}}}`
  }
}
