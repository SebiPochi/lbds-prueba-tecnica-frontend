import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const localToken = localStorage.getItem('access-token')

export const useUserStore = defineStore('user', () => {
  // State
  const _currentUser = ref({ type: -1 } as UserInfo)

  // Getter
  const currentUser = computed(() => _currentUser.value)

  // Actions
  function login(user: any) {
    _currentUser.value = user
  }

  function logout() {
    _currentUser.value = { type: -1 }
    localStorage.removeItem('access-token')
  }

  if (localStorage.getItem('currentUser')) {
    _currentUser.value = JSON.parse(localStorage.getItem('currentUser'))
  }
  watch(
    _currentUser,
    (userVal) => {
      localStorage.setItem('currentUser', JSON.stringify(userVal))
    },
    { deep: true },
  )

  function fetchLoginWithCookies() {}

  return { currentUser, login, logout }
})

interface UserInfo {
  type: number
}
