export default function createMenu() {
  const items = []

  for (let i = 1; i <= 10; i++) {
    items.push(createCategoryItem(i))
  }

  return {
    items
  }
}

function createGroup(i) {
  const items = []

  for (let j = 1; j <= 10; j++) {
    items.push(createCategoryItem(j))
  }

  return {
    text: `Group ${i}`,
    items
  }
}

function createCategoryItem(i) {
  const items = []

  for (let j = 1; j <= 10; j++) {
    items.push(createSubcategoryItem(j))
  }

  return {
    text: `Category ${i}`,
    items
  }
}

function createSubcategoryItem(i) {
  return {
    text: `Subcategory ${i}`,
    href: `/s/[subcategoryId]`,
    as: `/s/${i}`
  }
}
