<script setup>
   import { formatCurrency } from '@/helpers';
   import { displayDate } from '@/helpers/date';
   import { useAppointmentsStore } from '@/stores/appointments';
   defineProps({
      appointment: {
         type: Object
      }
   })
   const store = useAppointmentsStore()
</script>

<template>
   <div class="bg-white p-5 space-y-2 rounded-lg">
      <p class="text-gray-500 font-black">
         Fecha: <span class="font-light">{{ displayDate(appointment.date) }}</span>
         Hora: <span class="font-light">{{ appointment.time }} Horas</span>
      </p>
      <p class="text-lg font-black">Servicios Solicitados en la cita</p>
      <div v-for="service in appointment.services">
         <div class="flex justify-between items-center">
            <p>{{ service.name }}</p>
            <p class="text-lg font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
         </div>
      </div>
      <p class="text-2xl font-black text-right">
         Total a pagar <span class="text-blue-600">{{ formatCurrency(appointment.totalAmount) }}</span>
      </p>
      <div class="flex gap-2 items-center">
         <RouterLink
            class="bg-slate-600 rounded-lg py-1 px-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
            :to="{name: 'edit-appointment', params: { id: appointment._id }}"
         >Editar</RouterLink>
         <button 
            class="bg-red-600 rounded-lg py-1 px-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
            @click="store.deleteAppointment(appointment._id)"
         >Cancelar</button>
      </div>
   </div>
</template>