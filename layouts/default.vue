<template>
  <div class="flex h-screen overflow-hidden bg-slate-950 text-white">
    <div class="hidden lg:block w-64 flex-shrink-0 z-30">
      <AdminSidebar />
    </div>

    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"></div>

    <div 
      class="fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 transform transition-transform duration-300 lg:hidden border-r border-white/10"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <AdminSidebar @close-mobile="isMobileMenuOpen = false" />
    </div>

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AdminHeader @toggle-sidebar="isMobileMenuOpen = !isMobileMenuOpen" />
      
      <main class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const isMobileMenuOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>