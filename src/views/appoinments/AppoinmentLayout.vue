<script setup>
   import { useUserStore } from '@/stores/user';

   const store = useUserStore()

</script>

<template>
   <div class="flex justify-between">
      <h1 class="text-2xl lg:text-6xl font-black text-white">App Salón</h1>
      <div class="flex flex-col space-y-5">
         <div class="flex gap-2 items-center">
            <p class="text-white text-right">Hola: {{ store.getUserName }}</p>
            <button type="button"
               class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
               @click="store.signOut"
            >
               Cerrar Sesión
            </button>
         </div>
         <nav class="flex gap-2 justify-end items-center">
            <RouterLink
               class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
               :to="{name: 'my-appointments'}"
            >
               Mis Citas
            </RouterLink>
            <RouterLink
               :to="{name: 'new-appointment'}"
               class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700"
            >Nueva cita</RouterLink>
         </nav>
      </div>
   </div>
   <main>
      <RouterView/>
   </main>
</template>