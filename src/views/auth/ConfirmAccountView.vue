<script setup>
   import { onMounted } from 'vue';
   import { useRoute, useRouter } from 'vue-router'
   import AuthApi from '@/api/AuthApi';
   import { inject } from 'vue';

   const {params} = useRoute()
   const router = useRouter()
   const {token} = params
   const toast = inject('toast')

   onMounted(async () => {
      try {
         const {data} = await AuthApi.confirm(token)
         toast.open({
            message: data.data,
            type: 'success'
         })
         router.push({name: 'login'})
      } catch (error) {
         const {response} = error
         toast.open({
            message: response.data.error,
            type: 'error'
         })
      }
   })

</script>

<template>
   <h1 class="text-6xl font-extrabold text-white text-center mt-10">Verificar Cuenta</h1>
</template>