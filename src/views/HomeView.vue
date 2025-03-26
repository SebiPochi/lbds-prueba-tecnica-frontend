<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import OrganizacionView from '@/views/users/OrganizacionView.vue'
import borrachoViewVue from './users/borrachoView.vue'
const store = useUserStore()
</script>

<template>
  <main>
    <borrachoViewVue v-if="store.currentUser.type === 0"/>
    <OrganizacionView v-else-if="store.currentUser.type === 1"/>
  </main>
</template>
