export default function createMenu() {
  const items = []

  for (let i = 1; i <= 10; i++) {
    items.push(createGroup(i))
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
    ui: 'expand',
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
    ui: 'expand',
    items
  }
}

function createSubcategoryItem(i) {
  const items = []

  for (let j = 1; j <= 10; j++) {
    items.push(createProductItem(j))
  }

  return {
    text: `Subcategory ${i}`,
    href: `/s/[subcategoryId]`,
    as: `/s/${i}`,
    items
  }
}

function createProductItem(i) {
  return {
    text: `Product ${i}`,
    href: `/p/[productId]`,
    as: `/p/${i}`
  }
}
