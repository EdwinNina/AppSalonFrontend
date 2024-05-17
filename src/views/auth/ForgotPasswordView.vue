<script setup>
   import { inject } from 'vue';
   import AuthApi from '@/api/AuthApi';
   import { reset } from '@formkit/vue';

   const toast = inject('toast')

   const handleSubmit = async (value) => {
      try {
         const {data} = await AuthApi.forgotPassword(value)
         toast.open({
            message: data.data,
            type: 'success'
         })
         reset('forgotForm')
      } catch (error) {
         toast.open({
            message: error.response.data.error,
            type: 'error'
         })
      }
   }
</script>

<template>
   <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
   <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

   <FormKit
      type="form"
      id="forgotForm"
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
      <FormKit type="submit">Enviar instrucciones</FormKit>
   </FormKit>
</template>