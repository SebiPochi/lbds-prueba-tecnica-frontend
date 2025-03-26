<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-red-100 rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-center text-red-600 mb-4">¡Oh no! Algo salió mal</h1>
      
      <p v-if="route.query.error" class="text-lg text-gray-800 mb-6">
        {{ route.query.error }}
      </p>
      
      <p v-else class="text-lg text-gray-800 mb-6">
        No se especificó ningún error. Por favor, intenta nuevamente.
      </p>
      
      <RouterLink to="/" class="block text-center px-6 py-2 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-200">Volver al inicio</RouterLink>
    </div>
  </div>
</template>
