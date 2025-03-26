<script setup lang="ts">
import { onMounted, ref } from "vue";
import { formatTimestamp } from "@/utils/formatTimestamp"
import  {crearPartidoHandler, eliminarPartidoHandler}  from '@/handlers/PartidosHandler'
const partidos = ref()
const borrachos = ref()

const newPartido = ref({
  rival: '',
  fecha: '',
  hora: '',
  cancha: '',
  capacidad: 0,
})

onMounted(async () => {
  const token = localStorage.getItem('access-token')
  partidos.value = await fetch('http://localhost:3000/partidos', {
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(json => json.partidos)
  
  borrachos.value = await fetch('http://localhost:3000/borrachos', {
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(json => json.borrachos)
  
})

async function crearPartido() {
  try {
    const id = await crearPartidoHandler({ partido: newPartido.value})
    alert("Partido creado ID:" + id)
  } catch(e) {
    alert((e as Error).message)
  }
}

async function eliminarPartido(id) {
  try {
    const message = await eliminarPartidoHandler({ id})
    alert(message)
  } catch(e) {
    alert((e as Error).message)
  }
}

</script>
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <h1 class="text-3xl font-semibold text-center py-4">Proximos Partidos</h1>

    <!-- Formulario para crear o editar un partido -->
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mb-6">
      <form @submit.prevent="crearPartido" >
        <div class="mb-4">
          <label :for="newPartido.rival" class="block text-sm font-medium text-gray-700">Rival</label>
          <input v-model="newPartido.rival" type="text" id="rival" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Equipo">
        </div>
        <div class="mb-4">
          <label :for="newPartido.fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
          <input v-model="newPartido.fecha" type="date" id="fecha" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label :for="newPartido.hora" class="block text-sm font-medium text-gray-700">Hora</label>
          <input v-model="newPartido.hora" type="time" id="hora" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label :for="newPartido.cancha" class="block text-sm font-medium text-gray-700">Cancha</label>
          <input v-model="newPartido.cancha" type="text" id="cancha" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="newPartido.capacidad" class="block text-sm font-medium text-gray-700">Capacidad</label>
          <input v-model="newPartido.capacidad" type="number" id="capacidad" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" >
        </div>
        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition">Guardar</button>
      </form>
    </div>

    <!-- Lista de partidos -->
    <table class="w-full border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">#</th>
          <th class="border border-gray-300 p-2">Equipo Rival</th>
          <th class="border border-gray-300 p-2">Cancha</th>
          <th class="border border-gray-300 p-2">Fecha</th>
          <th class="border border-gray-300 p-2">Capacidad</th>
          <th class="border border-gray-300 p-2">Entradas Vendidas</th>
          <th class="border border-gray-300 p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="partido in partidos" :key="partido.id" class="text-center even:bg-gray-100 odd:bg-white">
          <td class="border border-gray-300 p-2">{{ partido.id }}</td>
          <td class="border border-gray-300 p-2">{{ partido.rival }}</td>
          <td class="border border-gray-300 p-2">{{ partido.cancha }}</td>
          <td class="border border-gray-300 p-2">{{ formatTimestamp(partido.fecha) }}</td>
          <td class="border border-gray-300 p-2">{{ partido.capacidad }}</td>
          <td class="border border-gray-300 p-2">{{ partido.entradasCompradas }}</td>
          <td class="border border-gray-300 p-2">
            <button @click="editarPartido(partido)" class="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Editar</button>
            <button @click="eliminarPartido(partido.id)" class="bg-red-500 text-white px-3 py-1 rounded-md">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Lista de hinchas -->
    <div class="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 class="text-3xl font-semibold text-center py-4">Gestión de Hinchas</h1>
      <table class="w-full border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 p-2">#</th>
            <th class="border border-gray-300 p-2">Nombre</th>
            <th class="border border-gray-300 p-2">Apellido</th>
            <th class="border border-gray-300 p-2">Email</th>
            <th class="border border-gray-300 p-2">Mensualidad</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(borracho, index) in borrachos" 
            :key="borracho.id" 
            class="text-center even:bg-gray-100 odd:bg-white"
          >
            <td class="border border-gray-300 p-2">{{ index + 1 }}</td>
            <td class="border border-gray-300 p-2">{{ borracho.nombre }}</td>
            <td class="border border-gray-300 p-2">{{ borracho.apellido }}</td>
            <td class="border border-gray-300 p-2">{{ borracho.email }}</td>
            <td class="border border-gray-300 p-2">
              <span 
                :class="borracho.estaPago ? 'text-green-500' : 'text-red-500'" 
                class="px-3 py-1"
              >
                {{ borracho.estaPago ? "Pagado" : "Pendiente" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>