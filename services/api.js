import axios from 'axios'

const api = baseURL => {
  const request = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
    },
  })

  request.interceptors.response.use(
    response => {
      return response.data
        ? response.data
        : response
    },
    error => {
      console.error(error)

      if (error.response && error.response.data) {
        return Promise.reject(error.response.data.error)
      }

      return Promise.reject(error)
    },
  )

  return request
}

export default api
