<script setup>
   import { ref } from 'vue';
   import ServiceSelected from '@/components/ServiceSelected.vue';
   import { formatCurrency } from '@/helpers';
   import { useAppointmentsStore } from '@/stores/appointments';
   import VueTailwindDatepicker from 'vue-tailwind-datepicker'

   const store = useAppointmentsStore()

   const formatter = ref({
      date: 'DD/MM/YYYY',
      month: 'MMM'
   })

   const disableDate = date => {
      const today = new Date

      return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
   }

</script>

<template>
   <h2 class="text-4xl font-extrabold text-white">Detalle y Resumen</h2>
   <p class="text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>
   <h3 class="text-3xl  font-extralight text-white">Servicios</h3>
   <p v-if="store.noSelectedServices" class="text-white text-2xl text-center">No hay servicios seleccionados</p>
   <div class="grid gap-5" v-else>
      <ServiceSelected
         v-for="service in store.services"
         :key="service._id"
         :service="service"
      />
      <p class="text-2xl text-white text-right">Total:
         <span class="font-black">{{ formatCurrency(store.totalCount) }}</span>
      </p>
   </div>
   <div class="space-y-8" v-if="!store.noSelectedServices">
      <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
      <div class="lg:flex gap-5 items-start">
         <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
            <VueTailwindDatepicker
               i18n="ex-mx"
               as-single
               no-input
               :formatter="formatter"
               v-model="store.date"
               :disable-date="disableDate"
            />
         </div>
         <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
            v-if="store.isDateSelected"
         >
            <button 
               v-for="hour in store.hours"
               class="block rounded-lg text-xl font-black p-3 disabled:opacity-65"
               v-text="hour"
               :class="store.time === hour ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
               :disabled="store.isHourSelected(hour)"
               @click="store.time = hour"
            ></button>
         </div>
      </div>
      <div class="flex justify-end" v-if="store.isValidReservation">
         <button
            class="w-full md:w-auto bg-blue-500 text-white rounded-lg p-3 uppercase font-black"
            @click="store.saveAppointment"
         >
            Confirmar reservacion
         </button>
      </div>
   </div>
</template>