<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Events</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Conferences, workshops, and meetups we organize and participate in
        </p>
      </div>
    </section>

    <!-- Events List -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div v-if="loading" class="text-center py-20">

          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-slate-500 mt-4">Loading events...</p>
        </div>

        <div v-else-if="events.length === 0" class="text-center py-20">
          <Calendar class="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p class="text-slate-500 text-lg mb-2">No events scheduled yet</p>
          <p class="text-slate-400 text-sm">Check back soon for upcoming events!</p>
        </div>

        <div v-else>
          <!-- Upcoming Events -->
          <div v-if="upcomingEvents.length > 0" class="mb-16">
            <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-8">Upcoming Events</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                v-for="event in upcomingEvents" 
                :key="event.id"
                class="group bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                <div class="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden transition-colors">
                  <img 
                    v-if="event.imageUrl"
                    :src="event.imageUrl" 
                    :alt="event.title"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <Calendar class="w-12 h-12 text-blue-400" />
                  </div>
                  <div class="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Upcoming
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400 mb-3">
                    <div class="flex items-center gap-2">
                      <Calendar class="w-4 h-4" />
                      <span>{{ formatDate(event.eventDate) }}</span>
                    </div>
                  </div>
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{{ event.title }}</h3>
                  <div v-if="event.location" class="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-3">
                    <MapPin class="w-4 h-4" />
                    <span>{{ event.location }}</span>
                  </div>
                  <p v-if="event.description" class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                    {{ event.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Past Events -->
          <div v-if="pastEvents.length > 0">
            <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-8">Past Events</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                v-for="event in pastEvents" 
                :key="event.id"
                class="group bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <div class="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden transition-colors">
                  <img 
                    v-if="event.imageUrl"
                    :src="event.imageUrl" 
                    :alt="event.title"
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <Calendar class="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <div class="flex items-center gap-2">
                      <Calendar class="w-4 h-4" />
                      <span>{{ formatDate(event.eventDate) }}</span>
                    </div>
                  </div>
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{{ event.title }}</h3>
                  <div v-if="event.location" class="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                    <MapPin class="w-4 h-4" />
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Want to Partner for an Event?
        </h2>
        <p class="text-white/80 dark:text-slate-400 mb-6">
          We're always open to collaboration opportunities
        </p>
        <NuxtLink 
          to="/contact" 
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-500 transition-colors"
        >
          Contact Us
          <ArrowRight class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Calendar, MapPin, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const events = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    events.value = await $fetch('/api/public/events')
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
})

const now = new Date()

const upcomingEvents = computed(() => {
  return events.value.filter(e => new Date(e.eventDate) >= now)
})

const pastEvents = computed(() => {
  return events.value.filter(e => new Date(e.eventDate) < now)
})

const formatDate = (dateString) => {
  if (!dateString) return 'TBD'
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
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
