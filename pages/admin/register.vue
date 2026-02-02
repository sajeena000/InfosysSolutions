<script setup>
import { UserPlus as UserPlusIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'

definePageMeta({
  layout: false 
})

const router = useRouter()
const isLoading = ref(false)
const error = ref('')
const registrationEnabled = ref(false)
const checkingRegistration = ref(true)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Check if registration is enabled
onMounted(async () => {
  try {
    const result = await $fetch('/api/admin/auth/check-registration')
    registrationEnabled.value = result.registrationEnabled
    if (!result.registrationEnabled) {
      router.push('/admin/login')
    }
  } catch (e) {
    router.push('/admin/login')
  } finally {
    checkingRegistration.value = false
  }
})

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true
  error.value = ''
  
  try {
    await $fetch('/api/admin/auth/register', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        confirmPassword: form.value.confirmPassword
      }
    })
    
    // Redirect to login with success message
    router.push('/admin/login')
  } catch (e) {
    error.value = e.data?.message || e.statusMessage || 'Registration failed'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

    <!-- Loading state -->
    <div v-if="checkingRegistration" class="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>

    <!-- Registration form -->
    <div v-else class="w-full max-w-md p-8 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 mx-4">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
          <user-plus-icon class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p class="text-slate-400 text-sm">Register as a new admin</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Display Name</label>
          <input 
            v-model="form.name"
            type="text" 
            placeholder="Your name"
            required
            class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Email</label>
          <input 
            v-model="form.email"
            type="email" 
            placeholder="you@example.com"
            required
            class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Password</label>
          <input 
            v-model="form.password"
            type="password" 
            placeholder="••••••••"
            required
            class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-300">Confirm Password</label>
          <input 
            v-model="form.confirmPassword"
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
          <span v-if="!isLoading">Create Account</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink to="/admin/login" class="text-slate-400 hover:text-slate-300 text-sm inline-flex items-center gap-1">
          <arrow-left-icon class="w-3.5 h-3.5" />
          Back to Sign In
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
