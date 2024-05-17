<script setup>
   import { onMounted, inject, ref } from 'vue';
   import AuthApi from '@/api/AuthApi';
   import { useRoute, useRouter } from 'vue-router';

   const router = useRouter()
   const route = useRoute()
   const toast = inject('toast')
   const userToken = ref('')

   onMounted(async () => {
      try {
         const {token} = route.params
         userToken.value = token
         await AuthApi.verifyToken(token)
      } catch (error) {
         userToken.value = ''
         toast.open({
            message: error.response.data.error,
            type: 'error'
         })
         router.push({ name: 'login' })
      }
   })

   const handleSubmit = async (value) => {
      try {
         const { data } = await AuthApi.updatePassword(userToken.value, value)
         toast.open({ message: data.data, type: 'success' })
         router.push({ name: 'login' })
      } catch (error) {
         toast.open({ message: error.response.data.error, type: 'error' })
         router.push({ name: 'forgot-password' })
      }
   }
</script>

<template>
   <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
   <p class="text-2xl text-white text-center my-5">Cambia tu contraseña</p>

   <FormKit
      type="form"
      id="resetForm"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los errores"
      @submit="handleSubmit"
   >
      <FormKit
         type="password"
         label="Nueva Contraseña"
         name="password"
         placeholder="Ingrese la contraseña"
         validation="required|length:8"
         :validation-messages="{
            required: 'La contraseña es obligatorio',
            length: 'La contraseña debe tener al menos 8 caracteres'
         }"
      />
      <FormKit type="submit">Resetear Contraseña</FormKit>
   </FormKit>
</template>