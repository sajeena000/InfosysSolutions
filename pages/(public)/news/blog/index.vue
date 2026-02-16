<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/2 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Latest Blog</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Insights, tutorials, and updates from our team
        </p>
      </div>
    </section>

    <!-- Blog List -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div v-if="loading" class="text-center py-20">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-slate-500 mt-4">Loading posts...</p>
        </div>

        <div v-else-if="blogs.length === 0" class="text-center py-20">
          <FileText class="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p class="text-slate-500 text-lg mb-2">No blog posts yet</p>
          <p class="text-slate-400 text-sm">Check back soon for updates!</p>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="post in blogs" 
            :key="post.id"
            :to="`/news/blog/${post.slug}`"
            class="group bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
          >
            <div class="aspect-video bg-slate-200 dark:bg-slate-700 relative overflow-hidden transition-colors">
              <img 
                v-if="post.coverImage"
                :src="post.coverImage" 
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="absolute inset-0 flex items-center justify-center">
                <FileText class="w-12 h-12 text-blue-300 dark:text-blue-400" />
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                <Calendar class="w-4 h-4" />
                <span>{{ formatDate(post.publishedAt || post.createdAt, 'long') }}</span>
              </div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                {{ post.excerpt || 'Read more to discover what this article is about...' }}
              </p>
              <div class="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Read More
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p class="text-white/80 dark:text-slate-400 mb-6">
          Get the latest updates delivered straight to your inbox
        </p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 bg-white/10 dark:bg-slate-800 border border-white/20 dark:border-slate-700 rounded-xl text-white placeholder-white/60 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-blue-500 transition-all backdrop-blur-sm"
          />
          <button class="px-6 py-3 bg-white text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-500 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { FileText, Calendar, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const blogs = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    blogs.value = await $fetch('/api/public/blogs')
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
  } finally {
    loading.value = false
  }
})

const { formatDate } = useFormatters()
</script>

