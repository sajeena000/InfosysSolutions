<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Contact Us</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Let's discuss how we can help bring your project to life
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Ready to start your next project? Have questions about our services? 
              We'd love to hear from you. Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 shrink-0 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <MapPin class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white mb-1">Our Office</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm">Sinamangal<br/>Kathmandu, Nepal</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 shrink-0 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Mail class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm">hello@infosys.com<br/>support@infosys.com</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 shrink-0 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Phone class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900 dark:text-white mb-1">Phone</h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm">+1 (555) 123-4567<br/>Mon-Fri 9am-6pm NPT</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 class="font-semibold text-slate-900 dark:text-white mb-4">Follow Us</h3>
              <div class="flex gap-3">
                <a href="#" class="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors">
                  <Linkedin class="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </a>
                <a href="#" class="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors">
                  <Twitter class="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </a>
                <a href="#" class="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors">
                  <Github class="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    required
                    class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    required
                    class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                  <select 
                    v-model="form.subject"
                    class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Support">Support</option>
                    <option value="Careers">Careers</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message *</label>
                <textarea 
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <button 
                type="submit"
                :disabled="submitting"
                class="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:bg-blue-500 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <Loader2 v-if="submitting" class="w-5 h-5 animate-spin" />
                {{ submitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <Teleport to="body">
      <div 
        v-if="showSuccess" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showSuccess = false"></div>
        <div class="relative bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle class="w-8 h-8 text-emerald-600" />
          </div>
          <h3 class="text-2xl font-display font-bold text-slate-900 mb-2">Message Sent!</h3>
          <p class="text-slate-600 mb-6">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button 
            @click="showSuccess = false"
            class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </Teleport>

    <!-- Error Toast -->
    <Teleport to="body">
      <Transition name="slide">
        <div 
          v-if="showError" 
          class="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 bg-rose-600 text-white rounded-xl shadow-2xl flex items-center gap-3 z-50"
        >
          <AlertCircle class="w-5 h-5" />
          <span>{{ errorMessage }}</span>
          <button @click="showError = false" class="ml-2 text-white/70 hover:text-white">
            <X class="w-4 h-4" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { MapPin, Mail, Phone, Linkedin, Twitter, Github, Loader2, CheckCircle, AlertCircle, X } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  submitting.value = true
  showError.value = false

  try {
    await $fetch('/api/public/contact', {
      method: 'POST',
      body: form.value
    })

    showSuccess.value = true
    form.value = { name: '', email: '', phone: '', subject: '', message: '' }
  } catch (error) {
    errorMessage.value = 'Failed to send message. Please try again.'
    showError.value = true
    setTimeout(() => { showError.value = false }, 4000)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
