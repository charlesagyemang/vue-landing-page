import apiClient from './axiosInstance'

export default {
  getMenus () {
    return apiClient.get('/menus/get/all')
  },
  getMenu (id) {
    return apiClient.get(`/menus/${id}`)
  },
  postMenu (menu) {
    return apiClient.post('/menus/create.new', menu)
  },
  editMenu (menuId, menuDataToUpdate) {
    return apiClient.patch(`/menus/${menuId}`, menuDataToUpdate)
  },
  deleteMenu (menuIdToDelete) {
    return apiClient.delete(`/menus/${menuIdToDelete}`)
  }
}
