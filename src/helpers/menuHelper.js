
export default (data) => {
  const categories = data.categories.results
  const items = data.items.results
  const payload = []

  categories.forEach((item) => {
    const returnObj = {
      name: item.name,
      id: item.id,
      desciption: item.description,
      selectedItems: []
    }
    items.forEach((item1) => {
      if (item1.categoryId === item.id) {
        delete item1.others
        delete item1.category
        delete item1.createdAt
        delete item1.updatedAt
        returnObj.selectedItems.push(item1)
      }
    })
    if (returnObj.selectedItems.length > 0) {
      payload.push(returnObj)
    }
  })
  return payload
}
