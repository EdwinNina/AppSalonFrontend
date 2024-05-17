import api from '../lib/axios'

export default {
   register(data) {
      return api.post('/auth/register', data)
   },
   login(data) {
      return api.post('/auth/login', data)
   },
   confirm(token) {
      return api.get(`/auth/verify/${token}`)
   },
   auth() {
      return api.get('/auth/user')
   },
   forgotPassword(data) {
      return api.post('/auth/forgot-password', data)
   },
   verifyToken(token) {
      return api.get(`/auth/forgot-password/${token}`)
   },
   updatePassword(token, data) {
      return api.post(`/auth/forgot-password/${token}`, data)
   },
   admin() {
      return api.get('/auth/admin')
   },
}