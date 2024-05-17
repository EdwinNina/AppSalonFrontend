<script setup>
   import { inject } from 'vue';
   import authApi from '../../api/AuthApi'
   import { reset } from '@formkit/vue'

   const toast = inject('toast')

   const handleSubmit = async (values) => {
      const {password_confirm, ...credentials} = values

      try {
         const {data} = await authApi.register(credentials)
         toast.open({
            message: data.data,
            type: 'success'
         })
         reset('registerForm')
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
   <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
   <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalon</p>
   <FormKit 
      type="form"
      id="registerForm"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los errores"
      @submit="handleSubmit"
   >
      <FormKit
         type="text"
         label="Nombre"
         name="username"
         placeholder="Tu nombre"
         validation="required|length:3"
         :validation-messages="{
            required: 'El nombre es obligatorio',
            length: 'El nombre es muy corto'
         }"
      />
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
      <FormKit
         type="password"
         label="Repetir Contraseña"
         name="password_confirm"
         placeholder="Repite la contraseña"
         validation="required|confirm"
         :validation-messages="{
            required: 'La contraseña es obligatorio',
            confirm: 'Las contraseñas no son iguales'
         }"
      />
      <FormKit type="submit">Crear cuenta</FormKit>
   </FormKit>
</template>