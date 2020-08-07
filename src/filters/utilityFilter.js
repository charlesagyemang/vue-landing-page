export const dateFiler = (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}

export const filterItems = (items, categories) => {
  const filteredItems = []
  categories.forEach((category) => {
    items.forEach((item) => {
      if (item.categoryId === category.id) {
        filteredItems.push(item)
      }
    })
  })
  return filteredItems
}
