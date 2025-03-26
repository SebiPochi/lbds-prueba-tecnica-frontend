import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const _currentUser = ref({} as UserInfo)

  // Getter
  const currentUser = computed(() => _currentUser.value)

  // set
  function login(user: any) {
    _currentUser.value = user
  }
  return { currentUser, login }
})

interface UserInfo {
  type: number
}
