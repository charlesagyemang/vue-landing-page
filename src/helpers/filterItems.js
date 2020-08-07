export default (items, categories) => {
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
