<script setup>
   import Appointment from '@/components/Appointment.vue';
import { useUserStore } from '@/stores/user';

   const store = useUserStore()
</script>

<template>
   <h2 class="text-4xl font-extrabold text-white mt-10">Mis citas</h2>
   <p class="text-white text-lg mt-5">A continuacion podras administrar tus próximas citas</p>
   <p v-if="store.loading" class="text-white text-2xl text-center mt-5">Cargando...</p>
   <template v-else>
      <p v-if="store.noAppointments" class="text-white text-2xl text-center mt-5">No tienes proximas citas</p>
      <div v-else class="grid grid-cols-1 gap-5 mt-10">
         <Appointment
            v-for="appointment in store.appointments"
            :key="appointment._id"
            :appointment="appointment"
         />
      </div>
   </template>
</template>