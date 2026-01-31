<template>
  <header class="h-16 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
    <button @click="$emit('toggle-sidebar')" class="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white">
      <Menu class="w-6 h-6" />
    </button>

    <div class="hidden md:block relative">
      <div 
        class="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-950/50 border border-white/10 w-96 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all"
      >
        <Search class="w-4 h-4 text-slate-500 shrink-0" />
        <div class="h-4 w-[1px] bg-white/10 mx-1 shrink-0"></div>
        <SearchFilter v-model="searchFilter" class="shrink-0" />
        <input 
          v-model="store.searchQuery" 
          type="text" 
          placeholder="Search..." 
          class="bg-transparent border-none outline-none text-sm text-white placeholder-slate-600 w-full ml-2"
          @focus="showSearchResults = true"
          @blur="hideSearchResults"
        />
        <button 
          v-if="store.searchQuery" 
          @click="store.searchQuery = ''"
          class="text-slate-500 hover:text-white transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div 
        v-if="(showSearchResults && store.searchQuery && isSearching) || (showSearchResults && store.searchQuery && hasResults)"
        class="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 max-h-96 overflow-y-auto custom-scrollbar"
      >
        <div v-if="isSearching" class="p-4 text-center text-slate-500 text-sm">
          Searching...
        </div>

        <template v-else>
          <div v-for="(items, type) in groupedResults" :key="type">
            <div class="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-white/5 bg-slate-950/30 sticky top-0 backdrop-blur-sm">
              {{ type }}
            </div>
            <div 
              v-for="item in items" 
              :key="item.id"
              @mousedown.prevent="navigateTo(item.url)"
              class="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-3"
            >
              <div 
                class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400"
              >
                <component :is="getIconComponent(item.icon)" class="w-4 h-4" />
              </div>
              <div>
                <p class="text-sm text-white">{{ item.title }}</p>
                <p class="text-xs text-slate-500">{{ item.subtitle }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="!hasResults && !isSearching" class="p-4 text-center text-slate-500 text-sm">
            No results found
          </div>
        </template>
      </div>
    </div>

    <div class="flex items-center gap-4 relative">
      <button 
        @click="showNotifications = !showNotifications"
        class="p-2 text-slate-400 hover:text-white transition-colors relative focus:outline-none"
      >
        <Bell class="w-5 h-5" />
        <span 
          v-if="store.unreadNotifications > 0" 
          class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"
        ></span>
      </button>

      <div 
        v-if="showNotifications"
        class="absolute right-0 top-12 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl z-50 transform origin-top-right transition-all"
      >
        <div class="p-4 border-b border-white/5 flex justify-between items-center">
          <h3 class="font-display font-semibold text-white">Notifications</h3>
          <span 
            v-if="store.unreadNotifications > 0" 
            class="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full"
          >
            {{ store.unreadNotifications }} New
          </span>
        </div>
        
        <div class="max-h-64 overflow-y-auto custom-scrollbar">
          <div 
            v-if="store.notifications.length === 0" 
            class="p-6 text-center text-slate-500 text-sm"
          >
            No notifications yet
          </div>
          <div 
            v-for="notif in store.notifications" 
            :key="notif.id" 
            class="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors flex gap-3"
            :class="{ 'opacity-50': notif.isRead }"
          >
            <div class="mt-1">
              <div class="w-2 h-2 rounded-full" :class="notif.color || 'bg-indigo-500'"></div>
            </div>
            <div>
              <p class="text-sm text-slate-200">{{ notif.text }}</p>
              <p class="text-xs text-slate-500 mt-1">{{ notif.time }}</p>
            </div>
          </div>
        </div>
        
        <div 
          v-if="store.unreadNotifications > 0"
          @click="handleMarkAllAsRead"
          class="p-3 text-center border-t border-white/5 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
        >
          <span class="text-xs font-medium text-indigo-400">Mark all as read</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Menu, Search, Bell, X, Settings, User, Briefcase, FileText, Calendar, MessageSquare, Building, BarChart } from 'lucide-vue-next'
import { useAppStore } from '~/stores/appStore'
import { watchDebounced } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const showNotifications = ref(false)
const showSearchResults = ref(false)
const searchResults = ref([])
const isSearching = ref(false)
const searchFilter = ref('all')

const config = useRuntimeConfig()

watch(() => route.path, () => {
  showSearchResults.value = false
})

const performSearch = async () => {
  console.log('Performing search for:', store.searchQuery)
  if (!store.searchQuery || store.searchQuery.length < 2) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  try {
    const apiUrl = `${config.app.baseURL}api/search`.replace('//', '/') 
    console.log('Fetching from:', apiUrl)
    
    const results = await $fetch(apiUrl, {
      params: {
        q: store.searchQuery,
        type: searchFilter.value
      }
    })
    console.log('Search results:', results)
    searchResults.value = results
  } catch (e) {
    console.error('Search failed', e)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

watchDebounced(
  [() => store.searchQuery, searchFilter],
  () => {
    performSearch()
  },
  { debounce: 300, maxWait: 1000 }
)

const groupedResults = computed(() => {
  if (!searchResults.value.length) return {}
  
  return searchResults.value.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {})
})

const hasResults = computed(() => {
  return searchResults.value.length > 0
})

const getIconComponent = (iconName) => {
  const icons = { User, Briefcase, FileText, Calendar, MessageSquare, Building, BarChart, Settings }
  return icons[iconName] || Search
}

const hideSearchResults = () => {
  setTimeout(() => {
    showSearchResults.value = false
  }, 200)
}

const navigateTo = (path) => {
  router.push(path)
  showSearchResults.value = false
}

const handleMarkAllAsRead = async () => {
  await store.markAllNotificationsAsRead()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>