import React, { useState } from 'react'
import NavTab from '../src/react-storefront/NavTab'
import NavTabs from '../src/react-storefront/NavTabs'

export default function Nav() {
  const [tabs, setTabs] = useState(data)

  return (
    <NavTabs>
      {tabs.map((tab, i) => (
        <NavTab key={i} href={tab.href} as={tab.as} label={tab.text} />
      ))}
    </NavTabs>
  )
}

const data = []

for (let i = 1; i <= 10; i++) {
  data.push({ as: `/s/${i}`, href: '/s/[subcategoryId]', text: `Category ${i}` })
}
