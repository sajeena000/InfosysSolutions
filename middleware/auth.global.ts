import { useAppStore } from '~/stores/appStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAppStore()

  if (to.path === '/login' && store.isAuthenticated) {
    return navigateTo('/')
  }

  if (to.path !== '/login' && !store.isAuthenticated) {
    return navigateTo('/login')
  }
})