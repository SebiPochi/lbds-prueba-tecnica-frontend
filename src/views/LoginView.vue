<script lang="ts" setup>
import { loginHandler } from '@/handlers/LoginHandler'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref()
const password = ref()

const router = useRouter()
const store = useUserStore()

async function login() {
  try {
    await loginHandler({ email: email.value, password: password.value, store })
    router.push('/')
  } catch (e) {
    router.push({ path: '/error', query: { error: (e as Error).message } })
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="login()">
        <div class="mb-4">
          <label class="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            v-model="email"
            required
            placeholder="micorreo@gmail.com"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>
