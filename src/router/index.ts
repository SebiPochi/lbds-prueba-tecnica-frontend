import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ErrorView from '@/views/ErrorView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { RouteLocationNormalized } from 'vue-router'
import { NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const userStore = useUserStore()
  const isAuth = userStore.currentUser.type !== -1

  if (to.meta.requiresAuth && !isAuth) {
    return '/login'
  }
})

export default router
