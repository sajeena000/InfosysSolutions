<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-none dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
    <PublicNavbar />
    
    <main class="pt-20">
      <slot />
    </main>
    
    <PublicFooter />
    <Chatbot />
  </div>
</template>

<script setup>
</script>
