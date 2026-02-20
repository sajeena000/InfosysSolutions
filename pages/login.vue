<script setup>
import { useAppStore } from '~/stores/appStore'
import { UserPlus as UserPlusIcon } from 'lucide-vue-next'

definePageMeta({
  layout: false 
})

const store = useAppStore()
const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const registrationEnabled = ref(false)

const email = ref('')
const password = ref('')

const requiresTwoFactor = ref(false)
const twoFactorCode = ref('')
const tempToken = ref('')

const handle2FA = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await $fetch('/api/admin/auth/2fa/validate', {
      method: 'POST',
      body: {
        token: twoFactorCode.value,
        tempToken: tempToken.value
      }
    })
    
    // Update store with user info (same as login success)
    store.isAuthenticated = true
    store.userProfile = {
      id: result.id,
      name: result.name,
      email: result.email,
      isPrimary: result.isPrimary,
      allowRegistration: result.allowRegistration
    }
    localStorage.setItem('is-auth', 'true')
    
    router.push('/admin')
  } catch (e) {
    error.value = e.data?.message || e.statusMessage || 'Invalid code'
    isLoading.value = false
  }
}

// Check if registration is enabled
onMounted(async () => {
  try {
    const result = await $fetch('/api/admin/auth/check-registration')
    registrationEnabled.value = result.registrationEnabled
  } catch (e) {
    registrationEnabled.value = false
  }
})

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await $fetch('/api/admin/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })
    
    if (result.requiresTwoFactor) {
      requiresTwoFactor.value = true
      tempToken.value = result.tempToken
      isLoading.value = false
      return
    }

    // Update store with user info
    store.isAuthenticated = true
    store.userProfile = {
      id: result.id,
      name: result.name,
      email: result.email,
      isPrimary: result.isPrimary,
      allowRegistration: result.allowRegistration
    }
    localStorage.setItem('is-auth', 'true')
    
    router.push('/admin')
  } catch (e) {
    error.value = e.data?.message || e.statusMessage || 'Invalid credentials'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

    <div class="w-full max-w-md p-8 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 mx-4">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
          <span class="font-bold text-white text-xl">TB</span>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-slate-400 text-sm">Sign in to access your dashboard</p>
      </div>

      <form v-if="!requiresTwoFactor" @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Email</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="admin@dashboard.com"
            required
            class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Password</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="••••••••"
            required
            class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div v-if="error" class="text-rose-400 text-sm text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
          {{ error }}
        </div>

        <button 
          :disabled="isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center"
        >
          <span v-if="!isLoading">Sign In</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>

      <form v-else @submit.prevent="handle2FA" class="space-y-4">
        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Two-Factor Authenticator Code</label>
          <input 
            v-model="twoFactorCode"
            type="text" 
            placeholder="123456"
            required
            maxlength="6"
            class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-center tracking-widest text-lg"
          />
        </div>

        <div v-if="error" class="text-rose-400 text-sm text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
          {{ error }}
        </div>

        <button 
          :disabled="isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center"
        >
          <span v-if="!isLoading">Verify</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
        
        <button 
          type="button"
          @click="requiresTwoFactor = false; twoFactorCode = ''; error = ''"
          class="w-full text-slate-400 hover:text-white text-sm transition-colors"
        >
          Back to Login
        </button>
      </form>

      <div v-if="registrationEnabled" class="mt-6 text-center">
        <p class="text-slate-500 text-sm">
          Don't have an account?
          <NuxtLink to="/admin/register" class="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 ml-1">
            <user-plus-icon class="w-3.5 h-3.5" />
            Register
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
