<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { registerHandler } from '@/handlers/RegisterHandler'

const router = useRouter()
const store = useUserStore()

const nombre = ref()
const apellido = ref()
const email = ref()
const password = ref()


// Función de registro
async function register () {
  try {
    await registerHandler({ nombre: nombre.value, apellido: apellido.value, email: email.value, password: password.value, store })
    router.push('/login')
  } catch (e) {
    router.push({ path: '/error', query: { error: (e as Error).message } })
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-4">Registro</h2>

      <form @submit.prevent="register">
        <!-- Nombre -->
        <div class="mb-3">
          <label class="block text-gray-700">Nombre</label>
          <input v-model="nombre" type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>

        <!-- Apellido -->
        <div class="mb-3">
          <label class="block text-gray-700">Apellido</label>
          <input v-model="apellido" type="text" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>

        <!-- Correo -->
        <div class="mb-3">
          <label class="block text-gray-700">Correo Electrónico</label>
          <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>

        <!-- Contraseña -->
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
        </div>

        <!-- Botón -->
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>