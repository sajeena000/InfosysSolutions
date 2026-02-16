<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-slate-500 mt-4">Loading article...</p>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!post" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <FileText class="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h1>
        <p class="text-slate-500 mb-6">The article you're looking for doesn't exist.</p>
        <NuxtLink to="/news/blog" class="text-indigo-600 font-medium hover:underline">
          ← Back to Blog
        </NuxtLink>
      </div>
    </div>

    <!-- Article Content -->
    <article v-else>
      <!-- Hero -->
      <div class="relative min-h-[50vh] flex items-end overflow-hidden">
        <div 
          class="absolute inset-0 bg-slate-900"
        >
          <img 
            v-if="post.coverImage"
            :src="post.coverImage"
            :alt="post.title"
            class="w-full h-full object-cover opacity-50 dark:opacity-30"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-950 dark:via-slate-950/50 dark:to-transparent"></div>
        
        <div class="relative max-w-4xl mx-auto px-4 py-16 w-full">
          <NuxtLink 
            to="/news/blog" 
            class="inline-flex items-center gap-2 text-slate-700 dark:text-white/70 hover:text-indigo-600 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Blog
          </NuxtLink>
          
          <h1 class="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {{ post.title }}
          </h1>
          
          <div class="flex items-center gap-4 text-slate-600 dark:text-white/70">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4" />
              <span class="text-sm">{{ formatDate(post.publishedAt || post.createdAt, 'long') }}</span>
            </div>
            <span>•</span>
            <span class="text-sm">{{ readingTime }} min read</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white dark:bg-slate-950 py-16 transition-colors duration-300">
        <div class="max-w-3xl mx-auto px-4">
          <div v-if="post.excerpt" class="text-xl text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800 italic">
            {{ post.excerpt }}
          </div>
          
          <div class="prose prose-lg prose-slate dark:prose-invert max-w-none" v-html="renderedContent"></div>

          <!-- Share Section -->
          <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Share this article</h3>
            <div class="flex gap-3">
              <button class="w-10 h-10 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-800">
                <Twitter class="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button class="w-10 h-10 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-800">
                <Linkedin class="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button class="w-10 h-10 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-800">
                <Link class="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- More Articles CTA -->
      <section class="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Want to Read More?
          </h2>
          <NuxtLink 
            to="/news/blog" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-colors"
          >
            View All Articles
            <ArrowRight class="w-5 h-5" />
          </NuxtLink>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { FileText, Calendar, ArrowLeft, ArrowRight, Twitter, Linkedin, Link } from 'lucide-vue-next'
import { marked } from 'marked'

definePageMeta({
  layout: 'public'
})

const route = useRoute()
const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    post.value = await $fetch(`/api/public/blogs/${route.params.slug}`)
  } catch (error) {
    console.error('Failed to fetch post:', error)
  } finally {
    loading.value = false
  }
})

const { formatDate } = useFormatters()

const readingTime = computed(() => {
  if (!post.value?.content) return 1
  const words = post.value.content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
})

const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  return marked(post.value.content)
})
</script>

<style>
/* Prose styling for markdown content */
.prose h1 { @apply text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4; }
.prose h2 { @apply text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4; }
.prose h3 { @apply text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3; }
.prose p { @apply text-slate-600 dark:text-slate-400 mb-4 leading-relaxed; }
.prose ul { @apply list-disc list-inside mb-4 text-slate-600 dark:text-slate-400; }
.prose ol { @apply list-decimal list-inside mb-4 text-slate-600 dark:text-slate-400; }
.prose li { @apply mb-2; }
.prose a { @apply text-indigo-600 dark:text-indigo-400 hover:underline; }
.prose blockquote { @apply border-l-4 border-indigo-500 pl-4 italic text-slate-500 my-4; }
.prose code { @apply bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm font-mono text-indigo-600 dark:text-indigo-400; }
.prose pre { @apply bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto mb-4 border border-slate-800; }
.prose pre code { @apply bg-transparent p-0 text-slate-100; }
.prose img { @apply rounded-xl my-6; }
</style>
