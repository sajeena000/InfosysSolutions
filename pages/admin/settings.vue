<template>
  <div class="max-w-2xl">
    <h1 class="text-3xl font-display font-bold text-white mb-8">Settings</h1>
    
    <div class="space-y-6 p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
      <div class="flex items-center gap-4 pb-6 border-b border-white/5">
        <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
          {{ store.userProfile.name?.charAt(0)?.toUpperCase() || 'A' }}
        </div>
        <div>
          <h2 class="text-xl font-semibold text-white">{{ store.userProfile.name }}</h2>
          <p class="text-slate-400">{{ store.userProfile.email }}</p>
          <span v-if="store.userProfile.isPrimary" class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400">
            <shield-icon class="w-3 h-3" />
            Primary Admin
          </span>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-300">Display Name</label>
        <div class="flex gap-3">
          <input 
            v-model="form.name"
            type="text" 
            class="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
          />
          <button 
            @click="saveName"
            :disabled="isSavingName || form.name === store.userProfile.name"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="!isSavingName">Save</span>
            <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-300">Email Address</label>
        <div class="flex gap-3">
          <div class="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-400">
            {{ store.userProfile.email }}
          </div>
          <button 
            @click="showEmailModal = true"
            class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all border border-white/10 flex items-center gap-2"
          >
            <mail-icon class="w-4 h-4" />
            Change
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium text-slate-300">Password</label>
        <div class="flex gap-3">
          <div class="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-400">
            ••••••••••••
          </div>
          <button 
            @click="showPasswordModal = true"
            class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all border border-white/10 flex items-center gap-2"
          >
            <lock-icon class="w-4 h-4" />
            Change
          </button>
        </div>
      </div>

      <div class="pt-4 border-t border-white/5 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-slate-300">Two-Factor Authentication</h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Add an extra layer of security to your account
            </p>
          </div>
          <button 
            @click="toggle2FA"
            class="px-3 py-1.5 rounded-lg font-medium transition-all text-xs flex items-center gap-2"
            :class="store.userProfile.twoFactorEnabled ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-indigo-600 hover:bg-indigo-500 text-white'"
          >
            {{ store.userProfile.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA' }}
          </button>
        </div>

        <div v-if="show2FASetup" class="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-4">
           <div v-if="loading2FA" class="flex justify-center py-4">
             <div class="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
           
           <div v-else-if="qrCodeUrl" class="space-y-4">
              <div class="text-center space-y-2">
                <p class="text-sm text-slate-300">Scan this QR code with your authenticator app</p>
                <div class="flex justify-center bg-white p-2 rounded-lg w-fit mx-auto">
                    <img :src="qrCodeUrl" alt="2FA QR Code" class="w-40 h-40" />
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Enter Verification Code</label>
                <div class="flex gap-2">
                  <input 
                    v-model="twoFactorCode"
                    type="text" 
                    placeholder="123456"
                    maxlength="6"
                    class="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-center tracking-widest"
                  />
                  <button 
                    @click="confirm2FA"
                    :disabled="!twoFactorCode || twoFactorCode.length !== 6"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify
                  </button>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div v-if="store.userProfile.isPrimary" class="pt-4 border-t border-white/5">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-slate-300">Allow Registration</h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Enable new admins to create accounts
            </p>
          </div>
          <button 
            @click="toggleRegistration"
            :disabled="isTogglingRegistration"
            class="w-12 h-7 rounded-full relative transition-colors"
            :class="store.userProfile.allowRegistration ? 'bg-indigo-600' : 'bg-slate-700'"
          >
            <div 
              class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300"
              :class="store.userProfile.allowRegistration ? 'right-1' : 'left-1'"
            ></div>
          </button>
        </div>
      </div>

      <div class="pt-4 border-t border-white/5">
        <button 
          @click="handleLogout"
          class="w-full px-4 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl font-medium transition-all border border-rose-500/20 flex items-center justify-center gap-2"
        >
          <log-out-icon class="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>

    <UiChangeEmailModal 
      v-model="showEmailModal" 
      @success="onEmailChanged" 
    />
    <UiChangePasswordModal 
      v-model="showPasswordModal" 
      @success="onPasswordChanged" 
    />
    <UiToast ref="toastRef" :title="toastTitle" :message="toastMessage" />
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/appStore'
import { Shield as ShieldIcon, Mail as MailIcon, Lock as LockIcon, LogOut as LogOutIcon } from 'lucide-vue-next'

const store = useAppStore()
const router = useRouter()
const toastRef = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')

const form = ref({
  name: store.userProfile.name
})

const showEmailModal = ref(false)
const showPasswordModal = ref(false)
const isSavingName = ref(false)
const isTogglingRegistration = ref(false)

const show2FASetup = ref(false)
const qrCodeUrl = ref('')
const twoFactorCode = ref('')
const twoFactorSecret = ref('')
const loading2FA = ref(false)

const toggle2FA = async () => {
  if (store.userProfile.twoFactorEnabled) {
    if (!confirm('Are you sure you want to disable Two-Factor Authentication?')) return
    
    try {
      await $fetch('/api/admin/auth/2fa/disable', { method: 'POST' })
      store.userProfile.twoFactorEnabled = false
      showToast('2FA Disabled', 'Two-Factor Authentication has been disabled.')
      show2FASetup.value = false
    } catch (e) {
      showToast('Error', e.data?.message || 'Failed to disable 2FA')
    }
  } else {
    show2FASetup.value = !show2FASetup.value
    if (show2FASetup.value) {
      loading2FA.value = true
      try {
        const result = await $fetch('/api/admin/auth/2fa/generate', { method: 'POST' })
        qrCodeUrl.value = result.qrCodeUrl
        twoFactorSecret.value = result.secret
      } catch (e) {
        showToast('Error', e.data?.message || 'Failed to generate 2FA secret')
        show2FASetup.value = false
      } finally {
        loading2FA.value = false
      }
    }
  }
}

const confirm2FA = async () => {
    try {
        await $fetch('/api/admin/auth/2fa/enable', {
            method: 'POST',
            body: {
                token: twoFactorCode.value,
                secret: twoFactorSecret.value
            }
        })
        store.userProfile.twoFactorEnabled = true
        show2FASetup.value = false
        showToast('2FA Enabled', 'Two-Factor Authentication has been enabled successfully.')
        qrCodeUrl.value = ''
        twoFactorCode.value = ''
        twoFactorSecret.value = ''
    } catch (e) {
        showToast('Error', e.data?.message || 'Invalid verification code')
    }
}

// Watch for store changes
watch(() => store.userProfile.name, (newName) => {
  form.value.name = newName
})

const showToast = (title, message) => {
  toastTitle.value = title
  toastMessage.value = message
  toastRef.value?.show()
}

const saveName = async () => {
  if (form.value.name.trim() === store.userProfile.name) return
  
  isSavingName.value = true
  try {
    const result = await $fetch('/api/admin/update-name', {
      method: 'POST',
      body: { name: form.value.name.trim() }
    })
    store.userProfile.name = result.name
    showToast('Name Updated', 'Your display name has been updated.')
  } catch (e) {
    showToast('Error', e.data?.message || 'Failed to update name')
  } finally {
    isSavingName.value = false
  }
}

const onEmailChanged = (result) => {
  store.userProfile.email = result.email
  showToast('Email Updated', 'Your email address has been updated.')
}

const onPasswordChanged = () => {
  showToast('Password Updated', 'Your password has been changed successfully.')
}

const toggleRegistration = async () => {
  isTogglingRegistration.value = true
  try {
    const result = await $fetch('/api/admin/toggle-registration', {
      method: 'POST'
    })
    store.userProfile.allowRegistration = result.allowRegistration
    showToast('Settings Updated', result.message)
  } catch (e) {
    showToast('Error', e.data?.message || 'Failed to toggle registration')
  } finally {
    isTogglingRegistration.value = false
  }
}

const handleLogout = async () => {
  try {
    await $fetch('/api/admin/auth/logout', { method: 'POST' })
    store.logout()
    router.push('/login')
  } catch (e) {
    console.error('Logout failed:', e)
  }
}
</script>