import {ref, onMounted, computed} from 'vue'
import { defineStore } from "pinia";
import AuthApi from '@/api/AuthApi';
import { useRouter } from 'vue-router';
import AppointmentApi from '@/api/AppointmentApi';

export const useUserStore = defineStore('user', () => {
   const user = ref({})
   const appointments = ref([])
   const router = useRouter()
   const loading = ref(true)

   onMounted(async () => {
      try {
         const {data} = await AuthApi.auth()
         user.value = data.data
         getAppointmentsByUser()
      } catch (error) {
         console.log(error.response.data.error)
      } finally {
         loading.value = false
      }
   })

   const getUserName = computed(() => user.value?.username ?? '')
   const noAppointments = computed(() => appointments.value.length === 0)

   const signOut = () => {
      localStorage.removeItem('AUTH_TOKEN')
      user.value = {}
      router.push({ name: 'login' })
   }

   const getAppointmentsByUser = async () => {
      try {
         const {data} = await AppointmentApi.getAppointmentsByUser(user.value._id)
         appointments.value = data.data
      } catch (error) {
         console.log(error.response.data.error)
      }
   }

   return {
      user,
      getUserName,
      loading,
      appointments,
      noAppointments,
      getAppointmentsByUser,
      signOut
   }
})