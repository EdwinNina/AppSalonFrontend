import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const api = axios.create({ baseURL })

api.interceptors.request.use(response => {
   const token = localStorage.getItem('AUTH_TOKEN')

   if(token) {
      response.headers['Authorization'] = `Bearer ${token}`
   }

   return response
})

export default api