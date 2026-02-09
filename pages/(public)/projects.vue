<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-10 right-10 w-72 h-72 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/5 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our Projects</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Explore our portfolio of successfully completed projects
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            v-for="type in projectTypes" 
            :key="type"
            @click="activeType = type"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeType === type 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            {{ type }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-slate-500 mt-4">Loading projects...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredProjects.length === 0" class="text-center py-20">
          <Folder class="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p class="text-slate-500 dark:text-slate-400">No completed projects to display yet.</p>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="group p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500/50 transition-all duration-300"
          >
            <!-- Project Type Badge -->
            <div class="flex items-center justify-between mb-4">
              <span 
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="getTypeBadgeClass(project.projectType)"
              >
                {{ project.projectType }}
              </span>
              <CheckCircle class="w-5 h-5 text-emerald-500" />
            </div>

            <!-- Project Info -->
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ project.name }}
            </h3>
            
            <p v-if="project.description" class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <!-- Client -->
            <div class="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <Building2 class="w-4 h-4 text-slate-400" />
              <span class="text-sm text-slate-500 dark:text-slate-400">{{ project.clientName || 'Client' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Ready to Start Your Project?
        </h2>
        <p class="text-white/80 dark:text-slate-400 mb-6">
          Let's bring your ideas to life with our expert team
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
import { Folder, CheckCircle, Building2, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const projects = ref([])
const loading = ref(true)
const activeType = ref('All')

const projectTypes = ['All', 'Web', 'Mobile', 'AI', 'DevOps', 'Consulting', 'Other']

onMounted(async () => {
  try {
    projects.value = await $fetch('/api/public/projects')
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  } finally {
    loading.value = false
  }
})

const filteredProjects = computed(() => {
  if (activeType.value === 'All') return projects.value
  return projects.value.filter(p => p.projectType === activeType.value)
})

const getTypeBadgeClass = (type) => {
  const classes = {
    'Web': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    'Mobile': 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    'AI': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    'DevOps': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    'Consulting': 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400',
    'Other': 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400'
  }
  return classes[type] || classes['Other']
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
