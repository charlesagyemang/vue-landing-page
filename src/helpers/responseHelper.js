export default (newResponse) => {
  const categories = newResponse[0].categories.results
  const finalRes = []
  categories.forEach((item, i) => {
    const formatter = { selected: [] }
    formatter.categoryName = item.name
    newResponse.forEach((newResponseItem, i) => {
      const name = newResponseItem.name
      const group = newResponseItem.group
      newResponseItem.items.results.forEach((newResponseItemItem, i) => {
        if (newResponseItemItem.categoryId === item.id) {
          const item = newResponseItemItem.name
          formatter.selected.push({
            name, group, item
          })
        }
      })
    })
    finalRes.push(formatter)
  })
  return finalRes
}
