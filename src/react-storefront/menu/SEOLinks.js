import React from 'react'
import Link from '../Link'
import NoScript from '../NoScript'

export default function SEOLinks({ root }) {
  if (!root) return null

  let links = [],
    key = 0

  const findLinks = ({ items }) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.url) {
        links.push(
          <Link key={key++} href={item.url} as={item.as}>
            {item.text}
          </Link>
        )
      }

      if (item.items) {
        findLinks(item)
      }
    }
  }

  findLinks(root)

  return (
    <>
      {/* 
        React doesn't execute the children of a noscript on the client, 
        therefore the style rules for Link will get written out of order
        unless we force a Link to render here.
        */}
      <div style={{ display: 'none' }}>
        <Link href="/" as="/" />
      </div>
      <NoScript>
        <nav
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '1px',
            width: '1px',
            overflow: 'hidden'
          }}
        >
          {links}
        </nav>
      </NoScript>
    </>
  )
}
