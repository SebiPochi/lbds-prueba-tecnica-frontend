<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { logoutHandler } from '@/handlers/LogoutHandler'
const userStore = useUserStore()
const router = useRouter()

async function logout() {
  try {
    await logoutHandler({store: userStore})
    router.push('/login')
  } catch (e) {
    router.push({ path: '/error', query: { error: (e as Error).message } })
  }
}

</script>
<template>
  <nav class="w-full h-16 flex flex-row justify-between content-center px-8 bg-amber-200">
    <ul v-if="userStore.currentUser.type !=-1"  class="w-1/3 flex content-center justify-evenly">
      <li class="flex content-centers"> 
        <p class="self-center font-bold">{{ userStore.currentUser.type ? "Organizador" : "Borracho" }}</p>
      </li>
      <li class="flex content-centers"> 
        <p class="self-center">{{ userStore.currentUser.nombre }} {{ userStore.currentUser.apellido }}</p>
      </li>
    </ul>
    <ul v-else class="w-1/3 flex content-center justify-evenly">
      <li class="flex content-center"> 
        <p class="self-center font-bold">Visitante</p>
      </li>
    </ul>
    <div v-if="userStore.currentUser.type ==-1" class="w-fit flex gap-6">
      <RouterLink class="self-center rounded-sm p-2 bg-amber-50" to="/register">Registrarse</RouterLink>
      <RouterLink class="self-center rounded-sm p-2" to="/login">Iniciar Sesion</RouterLink>
    </div>
    <div v-else class="w-fit flex gap-6">
      <button @click="logout()" class="self-center rounded-sm p-2 px-4 bg-amber-50">Salir</button>
    </div>
  </nav>
</template>
