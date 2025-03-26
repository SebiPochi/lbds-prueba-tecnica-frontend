<script setup lang="ts">
import { onMounted, ref } from "vue";

const partidos = ref()
const borrachos = ref()

onMounted(async () => {
  partidos.value = await fetch('http://localhost:3000/partidos')
    .then(res => res.json())
    .then(json => json.partidos)
  
  borrachos.value = await fetch('http://localhost:3000/borrachos')
  .then(res => res.json())
  .then(json => json.borrachos)
  
})
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <h1 class="text-3xl font-semibold text-center py-4">Proximos Partidos</h1>

    <!-- Formulario para crear o editar un partido -->
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-6">
      <form >
        <div class="mb-4">
          <label for="team" class="block text-sm font-medium text-gray-700">Rival</label>
          <input  type="text" id="team" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Equipo">
        </div>
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
          <input type="date" id="date" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="time" class="block text-sm font-medium text-gray-700">Hora</label>
          <input type="time" id="time" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="capacidad" class="block text-sm font-medium text-gray-700">Capacidad</label>
          <input type="text" id="score" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" >
        </div>
        <button onsubmit="" type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition">Guardar</button>
      </form>
    </div>

    <!-- Lista de partidos -->
    <div class="w-full max-w-md">
      <ul class="space-y-4">
        <li v-for="(partido, index) in partidos" :key="index" class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p class="text-lg font-medium">{{ partidos.id }}</p>
            <p class="text-sm text-gray-600">{{ partidos.fecha }}</p>
            <p class="text-sm text-gray-800">{{ partido.cancha }}</p>
            <p class="text-sm text-gray-800">{{ partido.capacidad }}</p>
          </div>
          <div class="flex gap-2">
            <button  class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition">Editar</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
    <h1 class="text-3xl font-semibold text-center py-4">Gestión de Hinchas</h1>

    <!-- Formulario para agregar o editar hinchas -->
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-6">
      <!-- <h2 class="text-2xl font-semibold mb-4">{{ isEditMode ? 'Editar Hincha' : 'Nuevo Hincha' }}</h2> -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" id="firstName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Nombre">
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido</label>
          <input type="text" id="lastName" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Apellido">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Correo electrónico">
        </div>
        <div class="mb-4">
          <label for="paymentStatus" class="block text-sm font-medium text-gray-700">¿Pagó la mensualidad?</label>
          <input type="checkbox" id="paymentStatus" class="mt-1 block" />
          <label for="paymentStatus" class="text-sm text-gray-600">Sí</label>
        </div>
        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition">Guardar</button>
      </form>
    </div>

    <!-- Lista de hinchas -->
    <div class="w-full max-w-md">
      <ul class="space-y-4">
        <li v-for="(borracho, index) in borrachos" :key="index" class="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p class="text-lg font-medium">{{ borracho.nombre }} {{ borracho.apellido }}</p>
            <p class="text-sm text-gray-600">{{ borracho.email }}</p>
            <!-- <p class="text-sm text-gray-800">{{ borracho.paymentStatus ? 'Pagó' : 'No pagó' }}</p> -->
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition">Editar</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>