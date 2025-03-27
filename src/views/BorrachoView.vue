<script setup lang="ts">

import { formatTimestamp } from "@/utils/formatTimestamp"
import { ref, onMounted, computed } from "vue"
import { useUserStore } from '@/stores/user'
import { pagarCuotaHandler, getBorracho, anotarsePartidoHandler } from '@/handlers/BorrachosHandler'

const partidos = ref()
const store = useUserStore()

const partidosAnotado = ref()

const estaCuotaPagada = ref(false)
const pagoCuota = computed(() => estaCuotaPagada.value)

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
  
  partidosAnotado.value = await fetch(`http://localhost:3000/borrachos/${store.currentUser.id}/partidos`, {
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(json => json.partidosAnotado)

  await obtenerDatosBorracho()
})

async function pagarCuota () {
  try {
    const message = await pagarCuotaHandler({id: store.currentUser.id})
    obtenerDatosBorracho()
    alert(message)
  } catch (e)  {
    alert((e as Error).message)
  }
}

async function anotarsePartido(partidoId) { 
  try {
    partidosAnotado.value = await anotarsePartidoHandler({borrachoId: store.currentUser.id, partidoId: String(partidoId)})
    alert('Te anotaste al partido correctamente')
  } catch (e) {
    alert((e as Error).message)
  }
}

async function obtenerDatosBorracho() {
  try {
    const borracho = await getBorracho({id: store.currentUser.id})
    estaCuotaPagada.value = Boolean(borracho.estaPago) 
  } catch (e) {
    console.log((e as Error).message)
  }
}

</script>
<template>
  <h1 class="text-3xl font-semibold text-center py-4">Partidos Anotado</h1>
  <table class="w-full border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">#</th>
          <th class="border border-gray-300 p-2">Equipo Rival</th>
          <th class="border border-gray-300 p-2">Cancha</th>
          <th class="border border-gray-300 p-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="partido in partidos" :key="partido.id" class="text-center even:bg-gray-100 odd:bg-white">
          <td v-if="partidosAnotado.includes(String(partido.id))" class="border border-gray-300 p-2"> - </td>
          <td v-if="partidosAnotado.includes(String(partido.id))" class="border border-gray-300 p-2">{{ partido.rival }}</td>
          <td v-if="partidosAnotado.includes(String(partido.id))" class="border border-gray-300 p-2">{{ partido.cancha }}</td>
          <td v-if="partidosAnotado.includes(String(partido.id))" class="border border-gray-300 p-2">{{ formatTimestamp(partido.fecha) }}</td>
        </tr>
      </tbody>
    </table>
  
  <h2 class="text-3xl font-semibold text-center py-4">Proximos Partidos</h2>
  <table class="w-full border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 p-2">#</th>
          <th class="border border-gray-300 p-2">Equipo Rival</th>
          <th class="border border-gray-300 p-2">Cancha</th>
          <th class="border border-gray-300 p-2">Fecha</th>
          <th class="border border-gray-300 p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="partido in partidos" :key="partido.id" class="text-center even:bg-gray-100 odd:bg-white">
          <td class="border border-gray-300 p-2"> - </td>
          <td class="border border-gray-300 p-2">{{ partido.rival }}</td>
          <td class="border border-gray-300 p-2">{{ partido.cancha }}</td>
          <td class="border border-gray-300 p-2">{{ formatTimestamp(partido.fecha) }}</td>
          <td v-if="!partidosAnotado.includes(String(partido.id))" class="border border-gray-300 p-2">
            <button @click="anotarsePartido(partido.id)" class="bg-blue-500 text-white px-3 py-1 rounded-md">Anotarse a Partido</button>
          </td>
          <td v-else>
            <p class="text-green-600">Ya estas anotado</p>
          </td>
        </tr>
      </tbody>
    </table>
  <!-- Pagar Cuota -->
  <h2 class="text-3xl font-semibold text-center py-4">Socio del Club - Membresia</h2>
  <div class="flex justify-center pb-10">
    <table class="w-full border-collapse border border-gray-300">
      <thead class="">
        <tr>
          <th class="border bg-gray-200 border-gray-300 p-2">Estado de membresia</th>
          <th v-if="pagoCuota" class="border bg-gray-50 border-gray-300 p-2 text-green-600">Cuota pagada</th>
          <th v-else class="border bg-gray-50  flex justify-center gap-6 border-gray-300 p-2">
            <p class="text-red-500 self-center" >No abonado</p> 
            <button @click="pagarCuota()" class="bg-amber-500 text-white px-3 py-1 rounded-md">Abonar Cuota</button>
          </th>
          </tr>
      </thead>
    </table>
  </div>
</template>