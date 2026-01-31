<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Gallery</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          A glimpse into our work, events, and company culture
        </p>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeCategory = category"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeCategory === category 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            {{ category }}
          </button>
        </div>

        <!-- Masonry Grid -->
        <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <div 
            v-for="(image, index) in filteredGallery" 
            :key="index"
            class="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
            @click="openLightbox(index)"
          >
            <img 
              :src="image.url" 
              :alt="image.title"
              class="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              :class="image.size === 'tall' ? 'min-h-[400px]' : 'min-h-[250px]'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="text-white font-semibold text-lg mb-1">{{ image.title }}</h3>
                <p class="text-white/70 text-sm">{{ image.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div 
        v-if="lightboxOpen" 
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        @click="lightboxOpen = false"
      >
        <button 
          class="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          @click="lightboxOpen = false"
        >
          <X class="w-6 h-6 text-white" />
        </button>
        
        <button 
          v-if="lightboxIndex > 0"
          class="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          @click.stop="lightboxIndex--"
        >
          <ChevronLeft class="w-6 h-6 text-white" />
        </button>
        
        <button 
          v-if="lightboxIndex < filteredGallery.length - 1"
          class="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          @click.stop="lightboxIndex++"
        >
          <ChevronRight class="w-6 h-6 text-white" />
        </button>

        <div class="max-w-5xl max-h-[80vh]" @click.stop>
          <img 
            :src="filteredGallery[lightboxIndex]?.url" 
            :alt="filteredGallery[lightboxIndex]?.title"
            class="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          <div class="text-center mt-4">
            <h3 class="text-white font-semibold text-lg">{{ filteredGallery[lightboxIndex]?.title }}</h3>
            <p class="text-white/60 text-sm">{{ filteredGallery[lightboxIndex]?.category }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const categories = ['All', 'Projects', 'Events', 'Team', 'Office']
const activeCategory = ref('All')
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', title: 'Team Collaboration', category: 'Team', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800', title: 'Modern Office Space', category: 'Office', size: 'tall' },
  { url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800', title: 'Project Planning', category: 'Projects', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', title: 'Annual Conference 2024', category: 'Events', size: 'tall' },
  { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', title: 'Client Workshop', category: 'Events', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800', title: 'Development Team', category: 'Team', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', title: 'Analytics Dashboard', category: 'Projects', size: 'tall' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', title: 'Open Workspace', category: 'Office', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', title: 'Team Meeting', category: 'Team', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800', title: 'Tech Conference', category: 'Events', size: 'normal' },
  { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800', title: 'Web App Launch', category: 'Projects', size: 'tall' },
  { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800', title: 'Lounge Area', category: 'Office', size: 'normal' },
]

const filteredGallery = computed(() => {
  if (activeCategory.value === 'All') return galleryImages
  return galleryImages.filter(img => img.category === activeCategory.value)
})

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}
</script>
