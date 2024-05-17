import api from "@/lib/axios"

export default {
   create(data) {
      return api.post('/appointments', data)
   },
   getByDate(date) {
      const params = { date }
      return api.get('/appointments', { params })
   },
   getAppointmentsByUser(user) {
      return api.get(`/user/${user}/appointments`)
   },
   getAppointment(id) {
      return api.get(`/appointments/${id}`)
   },
   updateAppointment(id, data) {
      return api.put(`/appointments/${id}/update`, data)
   },
   deleteAppointment(id) {
      return api.delete(`/appointments/${id}`)
   }
}