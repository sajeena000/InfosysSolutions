<template>
  <div>
    <!-- Hero -->
    <section class="relative py-16 bg-red-500 dark:!bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 dark:bg-red-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-2">Payment Failed</h1>
        <p class="text-white/80 text-lg">Something went wrong with your payment</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-[60vh]">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <!-- Failure Icon -->
        <div class="mb-8 flex justify-center">
          <div class="w-24 h-24 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center animate-bounce-in">
            <div class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
              <XCircle class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3">
          Payment Could Not Be Completed
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">
          Your payment was not processed. Don't worry — your project submission has been saved. You can try paying again or choose to visit our office instead.
        </p>

        <!-- Possible Reasons -->
        <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-left mb-10">
          <h4 class="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertCircle class="w-5 h-5 text-amber-500" />
            Possible Reasons
          </h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
              Insufficient balance in your eSewa account
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
              Transaction was cancelled or timed out
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
              Network connectivity issue during payment
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
              eSewa service temporarily unavailable
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/services"
            class="px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 inline-flex items-center justify-center gap-2"
          >
            <RotateCcw class="w-4 h-4" />
            Try Again
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-8 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all inline-flex items-center justify-center gap-2"
          >
            <Mail class="w-4 h-4" />
            Contact Support
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { XCircle, AlertCircle, RotateCcw, Mail } from 'lucide-vue-next'

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
