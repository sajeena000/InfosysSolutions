<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-display font-bold text-white mb-2">Payments</h1>
        <p class="text-slate-400">Track and manage all project submissions & payments.</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button 
          v-for="s in statusFilters" 
          :key="s"
          @click="filterStatus = s"
          class="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
          :class="filterStatus === s 
            ? 'bg-indigo-600 text-white' 
            : 'bg-white/5 text-slate-400 hover:text-white'"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <!-- Method Filter -->
    <div class="flex flex-wrap gap-2">
      <span class="text-xs text-slate-500 self-center mr-1">Method:</span>
      <button 
        v-for="m in methodFilters" 
        :key="m"
        @click="filterMethod = m"
        class="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
        :class="filterMethod === m 
          ? 'bg-slate-700 text-white' 
          : 'bg-white/5 text-slate-400 hover:text-white'"
      >
        {{ m === 'esewa' ? 'eSewa' : m === 'paypal' ? 'PayPal' : m }}
      </button>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
        <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Submissions</p>
        <p class="text-2xl font-display font-bold text-white">{{ stats.total }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
        <p class="text-xs text-emerald-400 uppercase tracking-wider mb-1">Paid</p>
        <p class="text-2xl font-display font-bold text-emerald-400">{{ stats.paid }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
        <p class="text-xs text-amber-400 uppercase tracking-wider mb-1">Pending</p>
        <p class="text-2xl font-display font-bold text-amber-400">{{ stats.pending }}</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
        <p class="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Revenue</p>
        <p class="text-2xl font-display font-bold text-white">Rs. {{ stats.revenue.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-slate-500 mt-4">Loading payments...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="payments.length === 0" class="text-center py-20 border border-dashed border-white/10 rounded-2xl">
      <CreditCard class="w-12 h-12 text-slate-500 mx-auto mb-4" />
      <p class="text-slate-400">No {{ filterStatus === 'all' ? '' : filterStatus }} payments found</p>
    </div>

    <!-- Payments Table -->
    <div v-else class="overflow-x-auto rounded-2xl border border-white/5">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-900/60 text-xs text-slate-400 uppercase tracking-wider">
            <th class="px-6 py-4 font-medium">Client</th>
            <th class="px-6 py-4 font-medium">Project</th>
            <th class="px-6 py-4 font-medium">Plan</th>
            <th class="px-6 py-4 font-medium">Amount</th>
            <th class="px-6 py-4 font-medium">Method</th>
            <th class="px-6 py-4 font-medium">Status</th>
            <th class="px-6 py-4 font-medium">Date</th>
            <th class="px-6 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr 
            v-for="payment in payments" 
            :key="payment.id"
            class="bg-slate-900/30 hover:bg-slate-800/50 transition-colors"
          >
            <!-- Client -->
            <td class="px-6 py-4">
              <div>
                <p class="text-sm font-medium text-white">{{ payment.fullName }}</p>
                <p class="text-xs text-slate-500">{{ payment.email }}</p>
              </div>
            </td>

            <!-- Project -->
            <td class="px-6 py-4">
              <p class="text-sm text-slate-300 max-w-[200px] truncate">{{ payment.projectTitle }}</p>
              <p class="text-xs text-slate-500">{{ payment.projectType }}</p>
            </td>

            <!-- Plan -->
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full"
                :class="{
                  'bg-blue-500/20 text-blue-400': payment.pricingPackage === 'Basic',
                  'bg-purple-500/20 text-purple-400': payment.pricingPackage === 'Professional',
                  'bg-amber-500/20 text-amber-400': payment.pricingPackage === 'Enterprise',
                  'bg-slate-500/20 text-slate-400': payment.pricingPackage === 'Custom',
                }"
              >
                {{ payment.pricingPackage }}
              </span>
            </td>

            <!-- Amount -->
            <td class="px-6 py-4">
              <span class="text-sm font-semibold text-white">Rs. {{ payment.amount?.toLocaleString() }}</span>
            </td>

            <!-- Method -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div 
                  class="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                  :class="{
                    'bg-emerald-500/20 text-emerald-400': payment.paymentMethod === 'esewa',
                    'bg-blue-500/20 text-blue-400': payment.paymentMethod === 'onsite',
                    'bg-blue-700/20 text-blue-300': payment.paymentMethod === 'paypal',
                  }"
                >
                  <Wallet v-if="payment.paymentMethod === 'esewa'" class="w-3.5 h-3.5" />
                  <Building v-else-if="payment.paymentMethod === 'onsite'" class="w-3.5 h-3.5" />
                  <Globe v-else class="w-3.5 h-3.5" />
                </div>
                <span class="text-xs text-slate-400 capitalize">
                  {{ payment.paymentMethod === 'esewa' ? 'eSewa' : payment.paymentMethod === 'paypal' ? 'PayPal' : 'Onsite' }}
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4">
              <span 
                class="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full"
                :class="{
                  'bg-emerald-500/20 text-emerald-400': payment.paymentStatus === 'paid',
                  'bg-amber-500/20 text-amber-400': payment.paymentStatus === 'pending',
                  'bg-rose-500/20 text-rose-400': payment.paymentStatus === 'failed',
                  'bg-slate-500/20 text-slate-400': payment.paymentStatus === 'cancelled',
                }"
              >
                {{ payment.paymentStatus }}
              </span>
            </td>

            <!-- Date -->
            <td class="px-6 py-4">
              <span class="text-xs text-slate-500">{{ formatDate(payment.createdAt, 'withTime') }}</span>
            </td>

            <!-- Action -->
            <td class="px-6 py-4">
              <select
                v-if="payment.paymentStatus !== 'paid'"
                :value="payment.paymentStatus"
                @change="updatePaymentStatus($event, payment)"
                class="bg-slate-950 border border-white/10 rounded-lg text-xs text-slate-300 px-2 py-1.5 outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="pending">Pending</option>
                <option value="paid">Mark Paid</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span v-else class="flex items-center gap-1 text-emerald-400 text-xs">
                <CheckCircle class="w-4 h-4" />
                Completed
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UiPagination 
      v-if="totalItems > 0"
      v-model:current-page="currentPage"
      :total="totalItems"
      :items-per-page="itemsPerPage"
    />

    <UiToast ref="toastRef" :title="toastTitle" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup>
import { CreditCard, Wallet, Building, Globe, CheckCircle } from 'lucide-vue-next'
import { useAppStore } from '~/stores/appStore'

const store = useAppStore()
const { formatDate } = useFormatters()

const payments = ref([])
const loading = ref(true)
const filterStatus = ref('all')
const filterMethod = ref('all')
const toastRef = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastType = ref('success')

const currentPage = ref(1)
const totalItems = ref(0)
const itemsPerPage = ref(10)

const statusFilters = ['all', 'pending', 'paid', 'failed', 'cancelled']
const methodFilters = ['all', 'esewa', 'paypal', 'onsite']

const stats = ref({ total: 0, paid: 0, pending: 0, revenue: 0 })

const fetchPayments = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/admin/payments', {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
        status: filterStatus.value,
        method: filterMethod.value,
        search: store.searchQuery
      }
    })
    payments.value = response.data
    totalItems.value = response.meta.total
  } catch (error) {
    console.error('Failed to fetch payments:', error)
  } finally {
    loading.value = false
  }
}

const fetchStats = async () => {
  try {
    // Get all payments to compute stats
    const all = await $fetch('/api/admin/payments', { params: { limit: 100 } })
    const items = all.data || []
    stats.value = {
      total: all.meta.total,
      paid: items.filter(p => p.paymentStatus === 'paid').length,
      pending: items.filter(p => p.paymentStatus === 'pending').length,
      revenue: items.filter(p => p.paymentStatus === 'paid').reduce((sum, p) => sum + (p.amount || 0), 0),
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

onMounted(() => {
  fetchPayments()
  fetchStats()
})

watch([currentPage, filterStatus, filterMethod, () => store.searchQuery], () => {
  fetchPayments()
})

watch([filterStatus, filterMethod, () => store.searchQuery], () => {
  currentPage.value = 1
})

const updatePaymentStatus = async (event, payment) => {
  const newStatus = event.target.value
  try {
    await $fetch(`/api/admin/payments/${payment.id}`, {
      method: 'PATCH',
      body: { paymentStatus: newStatus }
    })
    
    payment.paymentStatus = newStatus
    toastTitle.value = 'Updated'
    toastMessage.value = `Payment status changed to "${newStatus}".`
    toastType.value = 'success'
    
    // Refresh stats
    fetchStats()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to update payment status.'
    toastType.value = 'error'
  }
  toastRef.value.show()
}


</script>
