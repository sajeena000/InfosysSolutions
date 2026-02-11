<template>
  <div>
    <!-- Hero -->
    <section class="relative py-16 bg-emerald-500 dark:!bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-2">Payment Successful</h1>
        <p class="text-white/80 text-lg">Your transaction has been completed</p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-[60vh]">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <!-- Success Icon -->
        <div class="mb-8 flex justify-center">
          <div class="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center animate-bounce-in">
            <div class="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3">
          Payment Complete!
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">
          Thank you for your payment via eSewa. We've received your project submission and payment. Our team will reach out to you shortly.
        </p>

        <!-- Transaction Summary -->
        <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-left mb-10">
          <h3 class="font-display font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <Receipt class="w-5 h-5 text-emerald-600" />
            Transaction Summary
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              <span class="text-sm text-slate-500 dark:text-slate-400">Transaction ID</span>
              <span class="text-sm font-mono font-medium text-slate-900 dark:text-white">{{ transactionId }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              <span class="text-sm text-slate-500 dark:text-slate-400">Amount Paid</span>
              <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400">Rs. {{ formattedAmount }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              <span class="text-sm text-slate-500 dark:text-slate-400">Payment Method</span>
              <span class="text-sm font-medium text-slate-900 dark:text-white">eSewa</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-sm text-slate-500 dark:text-slate-400">Status</span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                <Check class="w-3.5 h-3.5" />
                Paid
              </span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="bg-blue-50 dark:bg-blue-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-500/20 text-left mb-10">
          <h4 class="font-semibold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2">
            <Clock class="w-5 h-5" />
            What Happens Next
          </h4>
          <ul class="space-y-2 text-sm text-blue-700 dark:text-blue-400/80">
            <li class="flex items-start gap-2">
              <span class="font-bold mt-0.5">1.</span>
              <span>Our team will review your project details within 24 hours</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold mt-0.5">2.</span>
              <span>You'll receive a confirmation email with project timeline</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="font-bold mt-0.5">3.</span>
              <span>A dedicated project manager will be assigned to your project</span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/"
            class="px-8 py-3 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 inline-flex items-center justify-center gap-2"
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
import { CheckCircle, Check, Receipt, Clock, Home, Mail } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const route = useRoute()
const transactionId = computed(() => route.query.txn || 'N/A')
const formattedAmount = computed(() => {
  const amount = parseInt(route.query.amount) || 0
  return amount.toLocaleString()
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
