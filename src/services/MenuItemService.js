import apiClient from './axiosInstance'

export default {
  getMenuItems () {
    return apiClient.get('/items/get/all')
  },
  getMenuItem (id) {
    return apiClient.get(`/items/${id}`)
  },
  postMenuItem (item) {
    return apiClient.post('/items/create.new', item)
  },
  editMenuItem (menuItemId, menuItemDataToUpdate) {
    return apiClient.patch(`/items/${menuItemId}`, menuItemDataToUpdate)
  },
  deleteMenuItem (menuItemIdToDelete) {
    return apiClient.delete(`/items/${menuItemIdToDelete}`)
  }
}
