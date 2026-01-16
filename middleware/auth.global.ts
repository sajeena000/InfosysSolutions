import { useAppStore } from '~/stores/appStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAppStore()

  if (to.path === '/login') {
    if (store.isAuthenticated) {
      return navigateTo('/')
    }
    return
  }

  if (!store.isAuthenticated) {
    return navigateTo('/login')
  }
})