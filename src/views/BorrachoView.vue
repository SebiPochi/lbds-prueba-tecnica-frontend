<script setup lang="ts">

import { formatTimestamp } from "@/utils/formatTimestamp"
import { ref, onMounted } from "vue"
import { useUserStore } from '@/stores/user'
import { pagarCuotaHandler } from '@/handlers/BorrachosHandler'
const partidos = ref()
const store = useUserStore()
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
})

async function pagarCuota () {
  try {
    const message = await pagarCuotaHandler({id: store.currentUser.id})
    alert(message)
  } catch (e)  {
    alert((e as Error).message)
  }
}

</script>
<template>
  <h1 class="text-3xl font-semibold text-center py-4">Proximos Partidos</h1>
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
          <td class="border border-gray-300 p-2">
            <button @click="anotarsePartido(partido.id)" class="bg-green-500 text-white px-3 py-1 rounded-md">Comprar Entrada</button>
          </td>
        </tr>
      </tbody>
    </table>
  <!-- Pagar Cuota -->
  <h2 class="text-3xl font-semibold text-center py-4">Socio del Club - Membresia</h2>
  <div class="flex justify-center pb-10">
    <button @click="pagarCuota()" class="bg-amber-500 text-white px-3 py-1 rounded-md">Abonar Cuota</button>
  </div>
</template>