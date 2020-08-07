import apiClient from './axiosInstance'

export default {
  getEvents () {
    return apiClient.get('/occassions/get/all')
  },
  getEvent (id) {
    return apiClient.get(`/occassions/${id}`)
  },
  postEvent (event) {
    return apiClient.post('/occassions/create.new', event)
  },
  editEvent (eventId, eventToEdit) {
    return apiClient.patch(`/occassions/${eventId}`, eventToEdit)
  },
  deleteEvent (eventToDeleteID) {
    return apiClient.delete(`/occassions/${eventToDeleteID}`)
  },
  postResponse (responseToCreate) {
    return apiClient.post('/responses/create.new', responseToCreate)
  }
}
