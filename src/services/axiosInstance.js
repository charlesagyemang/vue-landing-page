import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  // baseURL: 'https://possitech-menu-api.herokuapp.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFQbWJQQ2hUc2FOYVlhNW9vIiwiaWF0IjoxNTk2NTc3ODI0LCJleHAiOjE1OTY4MzcwMjR9.QakXd8kEukpy69LTZRM3L7ACvaVOka_0kccPlP1JQRY'
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdGcmthTWY5ZXFMQkpiSmlFIiwiaWF0IjoxNTk2NTc1NzYzLCJleHAiOjE1OTY4MzQ5NjN9.yl0kTYr2-hKjFajwmqloeXjLFH6y5iB69EwMzcUe_Xw'
  },
  timeout: 60000
})

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(config => {
  NProgress.done()
  return config
})

export default apiClient
