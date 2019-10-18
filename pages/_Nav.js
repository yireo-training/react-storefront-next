import React, { useState } from 'react'
import NavTab from '../src/react-storefront/NavTab'
import NavTabs from '../src/react-storefront/NavTabs'
import Row from '../src/react-storefront/Row'
import Link from '../src/react-storefront/Link'

export default function Nav() {
  const [tabs, setTabs] = useState(data)

  return (
    <NavTabs>
      {tabs.map((tab, i) => (
        <NavTab key={i} href={tab.href} as={tab.as} label={tab.text}>
          <div style={{ padding: 20 }}>
            <Row>
              <Link href="/s/[subcategoryId]" as="/s/1">
                Subcategory 1
              </Link>
            </Row>
            <Row>
              <Link href="/s/[subcategoryId]" as="/s/2">
                Subcategory 2
              </Link>
            </Row>
            <Row>
              <Link href="/s/[subcategoryId]" as="/s/3">
                Subcategory 3
              </Link>
            </Row>
          </div>
        </NavTab>
      ))}
    </NavTabs>
  )
}

const data = []

for (let i = 1; i <= 10; i++) {
  data.push({ as: `/s/${i}`, href: '/s/[subcategoryId]', text: `Category ${i}` })
}
