<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
const links = [
  {
    name: 'Rates',
    url: '/#',
  },
]

const { currentUser } = useUserStore()
</script>
<template>
  <nav class="w-full h-16 flex flex-row justify-between content-center px-8 bg-amber-200">
    <ul class="w-1/3 flex content-center justify-evenly">
      <li v-for="(link, index) in links" :key="index" class="flex content-center">
        <a :href="link.url" class="self-center">{{ link.name }}</a>
      </li>
      <p>{{ currentUser.type }}</p>
    </ul>
    <div class="w-fit flex gap-6">
      <RouterLink class="self-center rounded-sm p-2 bg-amber-50" to="/">Sign Up</RouterLink>
      <RouterLink class="self-center p-2 rounded-sm" to="/login">Login</RouterLink>
    </div>
  </nav>
</template>
