<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our Team</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Meet the talented individuals who make the magic happen
        </p>
      </div>
    </section>

    <!-- Team Grid -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div v-if="loading" class="text-center py-20">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-slate-500 mt-4">Loading team...</p>
        </div>

        <div v-else-if="team.length === 0" class="text-center py-20">
          <Users class="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p class="text-slate-500">No team members to display yet.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="member in team" 
            :key="member.id" 
            class="group bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700"
          >
            <!-- Image -->
            <div class="aspect-square bg-slate-200 dark:bg-slate-700 relative overflow-hidden transition-colors">
              <img 
                :src="member.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`" 
                :alt="member.name"
                class="w-full h-full object-cover"
              />
              <!-- Overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <a 
                  v-if="member.linkedinUrl" 
                  :href="member.linkedinUrl" 
                  target="_blank"
                  class="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-indigo-50 transition-colors"
                >
                  <Linkedin class="w-5 h-5 text-blue-600" />
                </a>
              </div>
            </div>
            
            <!-- Info -->
            <div class="p-6">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white transition-colors">{{ member.name }}</h3>
              <p class="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3 transition-colors">{{ member.jobTitle || member.role }}</p>
              <p v-if="member.bio" class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 transition-colors">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Team CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Want to Join Our Team?
        </h2>
        <p class="text-white/80 dark:text-slate-400 mb-6">
          We're always looking for talented individuals to join our growing team
        </p>
        <NuxtLink 
          to="/contact" 
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-500 transition-colors"
        >
          Get in Touch
          <ArrowRight class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Users, Linkedin, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const team = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    team.value = await $fetch('/api/public/team')
  } catch (error) {
    console.error('Failed to fetch team:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
