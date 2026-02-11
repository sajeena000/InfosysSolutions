<template>
  <div>
    <!-- Hero -->
    <section class="relative py-16 bg-blue-500 dark:!bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-2">Submission Received</h1>
        <p class="text-white/80 text-lg">Your project details have been saved</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-[60vh]">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <!-- Success Icon -->
        <div class="mb-8 flex justify-center">
          <div class="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center animate-bounce-in">
            <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <CheckCircle class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3">
          Thank You for Your Submission!
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">
          Your project details have been recorded. Please visit our office at your convenience to complete the payment and discuss your project further.
        </p>

        <!-- Office Info Card -->
        <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-left mb-8">
          <h3 class="font-display font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <Building class="w-5 h-5 text-blue-600" />
            Our Office
          </h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Address</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">Kathmandu, Nepal</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Clock class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Office Hours</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">Sunday – Friday: 10:00 AM – 5:00 PM</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Phone class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Contact</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">+977-01-XXXXXXX</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Mail class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Email</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">info@infosyssolutions.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- What to bring -->
        <div class="bg-amber-50 dark:bg-amber-500/5 rounded-2xl p-6 border border-amber-200 dark:border-amber-500/20 text-left mb-10">
          <h4 class="font-semibold text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
            <AlertCircle class="w-5 h-5" />
            What to Bring
          </h4>
          <ul class="space-y-2 text-sm text-amber-700 dark:text-amber-400/80">
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 shrink-0" />
              Valid ID for verification
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 shrink-0" />
              Any project reference materials or documents
            </li>
            <li class="flex items-center gap-2">
              <Check class="w-4 h-4 shrink-0" />
              Payment amount (cash or bank transfer)
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/"
            class="px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 inline-flex items-center justify-center gap-2"
          >
            <Home class="w-4 h-4" />
            Back to Home
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-8 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all inline-flex items-center justify-center gap-2"
          >
            <Mail class="w-4 h-4" />
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { CheckCircle, Building, MapPin, Clock, Phone, Mail, AlertCircle, Check, Home } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})
</script>

<style scoped>
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}
</style>
