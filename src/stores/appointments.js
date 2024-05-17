import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import AppointmentApi from "@/api/AppointmentApi";
import { convertToDDMMYYYY, convertToISO } from "@/helpers/date";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAppointmentsStore = defineStore('appointments', () => {
   const toast = inject('toast')
   const router = useRouter()
   const userStore = useUserStore()

   const services = ref([])
   const date = ref('')
   const hours = ref([])
   const time = ref('')
   const appointmentsByDate = ref([])
   const appointmentId = ref('')

   onMounted(() => {
      const startHour = 10, endHour = 19
      for (let hour = startHour; hour <= endHour; hour++) {
         hours.value.push(`${hour}:00`)
      }
   })

   watch(date, async () => {
      time.value = ''
      if(date.value === '') return

      try {
         const { data } = await AppointmentApi.getByDate(date.value)
         if(appointmentId.value) {
            appointmentsByDate.value = data.data.filter(appointment => appointment._id !== appointmentId.value)
            time.value = data.data.filter(appointment => appointment._id === appointmentId.value).at(0).time
         } else {
            appointmentsByDate.value = data.data
         }
      } catch (error) {
         console.log(error.response.data.error)
      }
   })

   function onServiceSelected(service) {
      if(services.value.some(selectedService => selectedService._id === service._id)) {
         deleteService(service._id)
         return
      }

      if(services.value.length === 2) {
         return alert('It should be 2 services per day')
      }
      services.value.push(service)
   }

   function deleteService(id) {
      services.value = services.value.filter(selectedService => selectedService._id !== id)
   }

   async function saveAppointment() {
      const appointment = {
         services: services.value.map(service => service._id),
         date: convertToISO(date.value),
         time: time.value,
         totalAmount: totalCount.value
      }

      try {
         const { data } = appointmentId.value
           ? await AppointmentApi.updateAppointment(appointmentId.value, appointment)
           : await AppointmentApi.create(appointment)

         toast.open({ message: data.data, type: 'success' })
         userStore.getAppointmentsByUser()
         clearAppointmentData()
         router.push({ name: 'my-appointments' })
      } catch (error) {
         const {response} = error
         toast.open({
            message: response.data.error,
            type: 'success'
         })
      }
   }

   function clearAppointmentData() {
      services.value = []
      date.value = ''
      time.value = ''
      appointmentId.value = ''
   }

   async function getAppointment(id) {
      try {
         const {data: result} = await AppointmentApi.getAppointment(id)
         const {data} = result
         services.value = data.services
         date.value = convertToDDMMYYYY(data.date)
         appointmentId.value = id
      } catch (error) {
         const {response} = error
         toast.open({
            message: response.data.error,
            type: 'success'
         })
      }
   }

   async function deleteAppointment(id) {
      try {
         const {data} = await AppointmentApi.deleteAppointment(id)
         const message =  data.data
         toast.open({ message, type: 'success' })
         userStore.getAppointmentsByUser()
      } catch (error) {
         const {response} = error
         toast.open({
            message: response.data.error,
            type: 'success'
         })
      }
   }

   const isServiceSelected = computed(() => {
      return (id) => services.value.some(service => service._id === id)
   })

   const noSelectedServices = computed(() => services.value.length === 0)

   const totalCount = computed(() => services.value.reduce((total, {price}) => total + price, 0 ))

   const isValidReservation = computed(() => {
      return services.value.length && date.value.length && time.value.length
   })

   const isDateSelected = computed(() => date.value.length)
   const isHourSelected = computed(() => {
      return (hour) => appointmentsByDate.value.find(({time}) => time === hour)
   })

   return {
      services,
      date,
      hours,
      time,
      isServiceSelected,
      totalCount,
      noSelectedServices,
      isValidReservation,
      isDateSelected,
      isHourSelected,
      appointmentId,
      onServiceSelected,
      deleteService,
      saveAppointment,
      getAppointment,
      clearAppointmentData,
      deleteAppointment
   }
})