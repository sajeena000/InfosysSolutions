<template>
  <div>
    <!-- Hero Banner -->
    <section class="relative py-16 bg-blue-500 dark:!bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-2">Start Your Project</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Tell us about your project and choose how you'd like to pay
        </p>
      </div>
    </section>

    <!-- Multi-step Form -->
    <section class="py-12 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      <div class="max-w-3xl mx-auto px-4">

        <!-- Stepper -->
        <div class="flex items-center justify-center mb-12">
          <div v-for="(stepLabel, i) in stepLabels" :key="i" class="flex items-center">
            <div class="flex flex-col items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                :class="i + 1 <= currentStep
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
              >
                <Check v-if="i + 1 < currentStep" class="w-5 h-5" />
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-xs mt-2 text-slate-500 dark:text-slate-400 font-medium hidden sm:block">{{ stepLabel }}</span>
            </div>
            <div
              v-if="i < stepLabels.length - 1"
              class="w-12 sm:w-20 h-0.5 mx-2 transition-colors duration-300"
              :class="i + 1 < currentStep ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'"
            ></div>
          </div>
        </div>

        <!-- Plan Summary Card (always visible) -->
        <div class="mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Package class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="font-display font-bold text-slate-900 dark:text-white">{{ selectedPlan }} Plan</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ selectedPlan === 'Basic' ? 'Perfect for startups' : 'For growing businesses' }}</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-2xl font-display font-bold text-slate-900 dark:text-white">Rs. {{ selectedAmount?.toLocaleString() }}</span>
              <span class="text-slate-500 text-sm block">/project</span>
            </div>
          </div>
        </div>

        <!-- Step 1: Your Information -->
        <div v-show="currentStep === 1">
          <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <User class="w-5 h-5 text-blue-600" />
            Your Information
          </h2>
          <div class="space-y-5">
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
                <input
                  v-model="form.fullName"
                  type="text"
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                <input
                  v-model="form.companyName"
                  type="text"
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Project Details -->
        <div v-show="currentStep === 2">
          <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText class="w-5 h-5 text-blue-600" />
            Project Details
          </h2>
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Title *</label>
              <input
                v-model="form.projectTitle"
                type="text"
                placeholder="My Awesome Project"
                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Type *</label>
                <select
                  v-model="form.projectType"
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="" disabled>Select type</option>
                  <option value="Web">Web Development</option>
                  <option value="Mobile">Mobile Development</option>
                  <option value="AI">AI & Machine Learning</option>
                  <option value="DevOps">DevOps & Cloud</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Preferred Timeline</label>
                <select
                  v-model="form.timeline"
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="" disabled>Select timeline</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="2-4 months">2-4 months</option>
                  <option value="4+ months">4+ months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project Description *</label>
              <textarea
                v-model="form.description"
                rows="4"
                placeholder="Describe your project requirements, goals, and any specific features you need..."
                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 3: Payment Method -->
        <div v-show="currentStep === 3">
          <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <CreditCard class="w-5 h-5 text-blue-600" />
            Choose Payment Method
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <!-- eSewa Card -->
            <button
              @click="form.paymentMethod = 'esewa'"
              class="relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group"
              :class="form.paymentMethod === 'esewa'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500/50'"
            >
              <div v-if="form.paymentMethod === 'esewa'" class="absolute top-3 right-3">
                <div class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check class="w-4 h-4 text-white" />
                </div>
              </div>
              <div class="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-4">
                <Wallet class="w-7 h-7 text-white" />
              </div>
              <h3 class="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Pay with eSewa</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Instant online payment via Nepal's leading digital wallet
              </p>
              <div class="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <Zap class="w-4 h-4" />
                Quick & Secure
              </div>
            </button>

            <!-- Onsite Card -->
            <button
              @click="form.paymentMethod = 'onsite'"
              class="relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group"
              :class="form.paymentMethod === 'onsite'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 shadow-lg shadow-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50'"
            >
              <div v-if="form.paymentMethod === 'onsite'" class="absolute top-3 right-3">
                <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check class="w-4 h-4 text-white" />
                </div>
              </div>
              <div class="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center mb-4">
                <Building class="w-7 h-7 text-white" />
              </div>
              <h3 class="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Onsite Payment</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Visit our office to complete payment and discuss your project in person
              </p>
              <div class="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <MapPin class="w-4 h-4" />
                In-person Experience
              </div>
            </button>

            <!-- PayPal Card -->
            <button
              @click="form.paymentMethod = 'paypal'"
              class="relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group"
              :class="form.paymentMethod === 'paypal'
                ? 'border-blue-700 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-700/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-700/50'"
            >
              <div v-if="form.paymentMethod === 'paypal'" class="absolute top-3 right-3">
                <div class="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center">
                  <Check class="w-4 h-4 text-white" />
                </div>
              </div>
              <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                 <div class="font-bold italic text-2xl text-blue-800">P<span class="text-sky-500">P</span></div>
              </div>
              <h3 class="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">Pay with PayPal</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Safe and secure international payments
              </p>
              <div class="mt-4 flex items-center gap-2 text-blue-800 dark:text-blue-400 text-sm font-medium">
                <Globe class="w-4 h-4" />
                Global Standard
              </div>
            </button>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between mt-10">
          <button
            v-if="currentStep > 1"
            @click="currentStep--"
            class="px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            <ArrowLeft class="w-4 h-4" />
            Back
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 3"
            @click="nextStep"
            :disabled="!canProceed"
            class="px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Continue
            <ArrowRight class="w-4 h-4" />
          </button>

          <button
            v-else
            @click="submitForm"
            :disabled="!form.paymentMethod || isSubmitting"
            class="px-8 py-3 text-sm font-medium text-white rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            :class="form.paymentMethod === 'esewa'
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30'
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            <template v-else>
              {{ form.paymentMethod === 'esewa' ? 'Pay with eSewa' : form.paymentMethod === 'paypal' ? 'Pay with PayPal' : 'Submit & Visit Office' }}
              <ArrowRight class="w-4 h-4" />
            </template>
          </button>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="mt-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-center gap-3">
          <AlertCircle class="w-5 h-5 text-red-500 shrink-0" />
          <span class="text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</span>
        </div>
      </div>
    </section>

    <!-- Hidden eSewa form (auto-submitted) -->
    <form ref="esewaFormRef" method="POST" :action="esewaData?.esewaUrl" style="display: none;">
      <template v-if="esewaData?.formData">
        <input v-for="(value, key) in esewaData.formData" :key="key" type="hidden" :name="key" :value="value" />
      </template>
    </form>
  </div>
</template>

<script setup>
import {
  Check, User, FileText, CreditCard, Package, Wallet, Building,
  ArrowLeft, ArrowRight, MapPin, Zap, Loader2, AlertCircle, Globe
} from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const route = useRoute()
const esewaFormRef = ref(null)

// Get plan info from query params
const selectedPlan = computed(() => route.query.plan || 'Basic')
const selectedAmount = computed(() => parseInt(route.query.amount) || 2999)

const currentStep = ref(1)
const isSubmitting = ref(false)
const errorMessage = ref('')
const esewaData = ref(null)

const stepLabels = ['Your Info', 'Project', 'Payment']

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  projectTitle: '',
  projectType: '',
  timeline: '',
  description: '',
  paymentMethod: '',
})

const canProceed = computed(() => {
  if (currentStep.value === 1) return form.fullName && form.email
  if (currentStep.value === 2) return form.projectTitle && form.projectType && form.description
  return true
})

const nextStep = () => {
  errorMessage.value = ''
  if (canProceed.value) currentStep.value++
}

const submitForm = async () => {
  if (!form.paymentMethod) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Step 1: Save project submission
    const submission = await $fetch('/api/public/project-submit', {
      method: 'POST',
      body: {
        ...form,
        pricingPackage: selectedPlan.value,
        amount: selectedAmount.value,
      }
    })

    if (form.paymentMethod === 'onsite') {
      // Redirect to onsite payment page
      navigateTo(`/payment/onsite?id=${submission.id}`)
    } else if (form.paymentMethod === 'paypal') {
        // Init PayPal
        const data = await $fetch('/api/public/paypal-initiate', {
            method: 'POST',
            body: { submissionId: submission.id }
        })
        
        if (data.approvalUrl) {
            window.location.href = data.approvalUrl
        }
    } else {
      // Get eSewa form data
      const data = await $fetch('/api/public/esewa-initiate', {
        method: 'POST',
        body: { submissionId: submission.id }
      })

      esewaData.value = data

      // Wait for DOM update then submit the hidden form
      await nextTick()
      esewaFormRef.value?.submit()
    }
  } catch (err) {
    errorMessage.value = err?.data?.message || 'Something went wrong. Please try again.'
    isSubmitting.value = false
  }
}
</script>
