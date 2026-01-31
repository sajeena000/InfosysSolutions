<template>
  <footer class="bg-slate-50 dark:bg-slate-900 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div class="space-y-6">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <span class="text-white font-bold text-lg">IS</span>
            </div>
            <span class="font-display font-bold text-xl text-slate-900 dark:text-white">Infosys</span>
          </NuxtLink>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Transforming ideas into digital reality. We build scalable, secure, and beautiful software solutions for modern businesses.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all">
              <Github class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-6">Company</h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink to="/about/company" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about/team" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Our Team</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/careers" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-6">Services</h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink to="/services" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Web Development</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mobile Apps</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cloud Solutions</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI & ML</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-6">Stay Updated</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-4 text-sm">
            Subscribe to our newsletter for the latest insights and tech news.
          </p>
          <form @submit.prevent="handleSubscribe" class="space-y-2">
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email" 
              class="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <button 
              type="submit" 
              class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-slate-500 dark:text-slate-500 text-sm">
          &copy; {{ new Date().getFullYear() }} Infosys Solutions. All rights reserved.
        </p>
        <div class="flex gap-6 text-sm">
          <a href="#" class="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" class="text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Linkedin, Twitter, Github } from 'lucide-vue-next'

const email = ref('')

const handleSubscribe = () => {
  alert('Thanks for subscribing!')
  email.value = ''
}
</script>
