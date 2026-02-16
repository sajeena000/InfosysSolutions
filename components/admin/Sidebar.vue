<template>
  <aside class="h-full flex flex-col bg-slate-900/50 backdrop-blur-xl border-r border-white/5">
    <div class="h-16 flex items-center px-6 border-b border-white/5">
      <NuxtLink to="/admin">
        <UiLogo />
      </NuxtLink>
    </div>
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <p class="px-4 text-[10px] uppercase tracking-wider text-slate-500 mb-2">Main</p>
      <NuxtLink 
        v-for="link in mainLinks" 
        :key="link.path" 
        :to="link.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden"
        :class="route.path === link.path ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        @click="$emit('close-mobile')"
      >
        <div v-if="route.path === link.path" class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"></div>
        
        <component :is="link.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
        <span class="font-medium text-sm">{{ link.name }}</span>
      </NuxtLink>

      <p class="px-4 text-[10px] uppercase tracking-wider text-slate-500 mt-6 mb-2">Content</p>
      <NuxtLink 
        v-for="link in cmsLinks" 
        :key="link.path" 
        :to="link.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden"
        :class="route.path === link.path ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        @click="$emit('close-mobile')"
      >
        <div v-if="route.path === link.path" class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"></div>
        
        <component :is="link.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
        <span class="font-medium text-sm">{{ link.name }}</span>
        <span v-if="link.badge" class="ml-auto px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full">
          {{ link.badge }}
        </span>
      </NuxtLink>

      <a 
        href="/" 
        target="_blank"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5 mt-6"
      >
        <ExternalLink class="w-5 h-5" />
        <span class="font-medium text-sm">View Website</span>
      </a>
    </nav>

    <div class="p-4 border-t border-white/5">
      <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
        <img 
          :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${store.userProfile.name}`" 
          alt="User" 
          class="w-8 h-8 rounded-full bg-slate-700" 
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">{{ store.userProfile.name }}</p>
          <div class="flex items-center gap-1.5">
            <span 
              class="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold"
              :class="{
                'bg-indigo-500/20 text-indigo-400': currentRole === 'admin',
                'bg-amber-500/20 text-amber-400': currentRole === 'manager',
                'bg-slate-500/20 text-slate-400': currentRole === 'member'
              }"
            >
              {{ currentRole }}
            </span>
          </div>
        </div>

        <button 
          @click="handleLogout" 
          class="p-1 text-slate-500 hover:text-rose-400 transition-colors"
          title="Sign Out"
        >
          <LogOut class="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <UiConfirmModal
      v-model="showLogoutConfirm"
      title="Log Out"
      description="Are you sure you want to log out of your account?"
      confirm-text="Log Out"
      type="danger"
      @confirm="confirmLogout"
    />
  </aside>
</template>

<script setup>
import { Home, PieChart, Settings, Users, LogOut, FileText, Calendar, Mail, Briefcase, ExternalLink, CreditCard } from 'lucide-vue-next'
import { useAppStore } from '~/stores/appStore'
import { usePermissions } from '~/composables/usePermissions'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const { currentRole } = usePermissions()

const showLogoutConfirm = ref(false)

const handleLogout = () => {
  showLogoutConfirm.value = true
}

const confirmLogout = () => {
  showLogoutConfirm.value = false
  store.logout()
  router.push('/login')
}

const mainLinks = [
  { name: 'Dashboard', path: '/admin', icon: Home },
  { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
  { name: 'Team', path: '/admin/team', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

const cmsLinks = [
  { name: 'Blog Posts', path: '/admin/blogs', icon: FileText },
  { name: 'Events', path: '/admin/events', icon: Calendar },
  { name: 'Inquiries', path: '/admin/contacts', icon: Mail },
  { name: 'Payments', path: '/admin/payments', icon: CreditCard },
  { name: 'Projects', path: '/admin/projects', icon: Briefcase },
]
</script>