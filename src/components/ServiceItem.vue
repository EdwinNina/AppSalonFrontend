<script setup>
   import { formatCurrency } from '@/helpers';
   import { useAppointmentsStore } from '@/stores/appointments';

   const store = useAppointmentsStore()

   defineProps({
      service: {
         type: Object,
         required: true
      }
   })
</script>

<template>
   <div
      class="p-5 space-y-5 rounded-lg cursor-pointer"
      @click="store.onServiceSelected(service)"
      :class="store.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
   >
      <p class="text-2xl font-light">{{ service.name }}</p>
      <p
         class="text-4xl font-black"
         :class="store.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
      >{{ formatCurrency(service.price) }}</p>
   </div>
</template>