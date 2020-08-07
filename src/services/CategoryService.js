import apiClient from './axiosInstance'

export default {
  getCategories () {
    return apiClient.get('/categories/get/all')
  },
  getCategory (id) {
    return apiClient.get(`/categories/${id}`)
  },
  postCategory (category) {
    return apiClient.post('/categories/create.new', category)
  },
  editCategory (categoryId, categoryToEdit) {
    return apiClient.patch(`/categories/${categoryId}`, categoryToEdit)
  },
  deleteCategory (categoryToDeleteID) {
    return apiClient.delete(`/categories/${categoryToDeleteID}`)
  }
}
