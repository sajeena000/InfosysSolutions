<template>
  <nav class="fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-colors duration-300">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
          <span class="text-white font-bold text-lg">IS</span>
        </div>
        <span class="font-display font-bold text-xl text-slate-900 dark:text-white transition-colors">Infosys Solutions</span>
      </NuxtLink>
<!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-1">
        <NuxtLink 
          to="/" 
          class="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          :class="route.path === '/' ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          Home
        </NuxtLink>

        <div class="relative group">
          <button class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all flex items-center gap-1">
            About Us
            <ChevronDown class="w-4 h-4 transition-transform group-hover:rotate-180" />
          </button>
          <div class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 py-2 min-w-[180px]">
              <NuxtLink to="/about/company" class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                Our Company
              </NuxtLink>
              <NuxtLink to="/about/team" class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                Our Team
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink 
          to="/services" 
          class="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          :class="route.path === '/services' ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          Services & Pricing
        </NuxtLink>

        <NuxtLink 
          to="/gallery" 
          class="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          :class="route.path === '/gallery' ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          Gallery
        </NuxtLink>

        <div class="relative group">
          <button class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all flex items-center gap-1">
            News & Events
            <ChevronDown class="w-4 h-4 transition-transform group-hover:rotate-180" />
          </button>
          <div class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 py-2 min-w-[180px]">
              <NuxtLink to="/news/blog" class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                Latest Blog
              </NuxtLink>
              <NuxtLink to="/news/events" class="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                Event Highlights
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink 
          to="/contact" 
          class="ml-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
        >
          Contact Us
        </NuxtLink>
        
        <button 
          @click="toggleTheme" 
          class="ml-1 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
        </button>
      </div>

      <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
        <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-800 pt-4">
      <div class="flex flex-col gap-2">
        <NuxtLink to="/" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Home
        </NuxtLink>
        <NuxtLink to="/about/company" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Our Company
        </NuxtLink>
        <NuxtLink to="/about/team" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Our Team
        </NuxtLink>
        <NuxtLink to="/services" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Services & Pricing
        </NuxtLink>
        <NuxtLink to="/gallery" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Gallery
        </NuxtLink>
        <NuxtLink to="/news/blog" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Latest Blog
        </NuxtLink>
        <NuxtLink to="/news/events" @click="mobileMenuOpen = false" class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
          Event Highlights
        </NuxtLink>
        <NuxtLink to="/contact" @click="mobileMenuOpen = false" class="mt-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-center">
          Contact Us
        </NuxtLink>
        <button 
          @click="toggleTheme" 
          class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
        >
          <Sun v-if="isDark" class="w-5 h-5" />
          <Moon v-else class="w-5 h-5" />
          {{ isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-vue-next'

const { isDark, toggleTheme, initTheme } = useTheme()
const route = useRoute()
const mobileMenuOpen = ref(false)

onMounted(() => {
  initTheme()
})

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>
