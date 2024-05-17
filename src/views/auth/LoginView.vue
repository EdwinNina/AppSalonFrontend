<script setup>
   import AuthApi from '@/api/AuthApi';
   import { inject } from 'vue';
   import { useRouter } from 'vue-router';
   
   const toast = inject('toast')
   const router = useRouter()

   const handleSubmit = async (credentials) => {
      try {
         const {data} = await AuthApi.login(credentials)
         const token = data.data

         toast.open({
            message: 'User logged in successfully',
            type: 'success'
         })
         localStorage.setItem('AUTH_TOKEN', token)
         router.push({ name: 'appoinments' })
      } catch (error) {
         const {response} = error
         toast.open({
            message: response.data.error,
            type: 'error'
         })
      }
   }
</script>

<template>
   <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
   <p class="text-2xl text-white text-center my-5">Inicia Sesión en AppSalon</p>
   <FormKit
      type="form"
      id="loginForm"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los errores"
      @submit="handleSubmit"
   >
      <FormKit
         type="email"
         label="Correo electronico"
         name="email"
         placeholder="Correo electronico"
         validation="required|email"
         :validation-messages="{
            required: 'El correo electronico es obligatorio',
            email: 'Ingresa un correo electronico valido'
         }"
      />
      <FormKit
         type="password"
         label="Contraseña"
         name="password"
         placeholder="Ingrese la contraseña"
         validation="required|length:8"
         :validation-messages="{
            required: 'La contraseña es obligatorio',
            length: 'La contraseña debe tener al menos 8 caracteres'
         }"
      />
      <FormKit type="submit">Iniciar Sesión</FormKit>
   </FormKit>
</template>