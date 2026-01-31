<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-display font-bold text-white mb-2">Contact Inquiries</h1>
        <p class="text-slate-400">View and manage messages from the public contact form.</p>
      </div>
      
      <div class="flex gap-2">
        <button 
          v-for="status in ['all', 'new', 'in-progress', 'resolved']" 
          :key="status"
          @click="filterStatus = status"
          class="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
          :class="filterStatus === status 
            ? 'bg-indigo-600 text-white' 
            : 'bg-white/5 text-slate-400 hover:text-white'"
        >
          {{ status === 'in-progress' ? 'In Progress' : status }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-slate-500 mt-4">Loading inquiries...</p>
    </div>

    <div v-else-if="filteredContacts.length === 0" class="text-center py-20 border border-dashed border-white/10 rounded-2xl">
      <Mail class="w-12 h-12 text-slate-500 mx-auto mb-4" />
      <p class="text-slate-400">No {{ filterStatus === 'all' ? '' : filterStatus }} inquiries found</p>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="contact in filteredContacts" 
        :key="contact.id"
        class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all"
      >
        <div class="flex flex-col lg:flex-row lg:items-start gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-white font-medium text-lg">{{ contact.name }}</h3>
              <span 
                class="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full"
                :class="{
                  'bg-rose-500/20 text-rose-400': contact.status === 'new',
                  'bg-amber-500/20 text-amber-400': contact.status === 'in-progress',
                  'bg-emerald-500/20 text-emerald-400': contact.status === 'resolved'
                }"
              >
                {{ contact.status }}
              </span>
            </div>

            <div class="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
              <a :href="`mailto:${contact.email}`" class="flex items-center gap-1 hover:text-indigo-400">
                <Mail class="w-4 h-4" />
                {{ contact.email }}
              </a>
              <span v-if="contact.phone" class="flex items-center gap-1">
                <Phone class="w-4 h-4" />
                {{ contact.phone }}
              </span>
              <span v-if="contact.subject" class="flex items-center gap-1">
                <Tag class="w-4 h-4" />
                {{ contact.subject }}
              </span>
            </div>

            <p class="text-slate-300 text-sm whitespace-pre-wrap">{{ contact.message }}</p>

            <p class="text-slate-500 text-xs mt-4">
              Received {{ formatDate(contact.createdAt) }}
            </p>
          </div>

          <div class="flex lg:flex-col items-center gap-2">
            <select 
              :value="contact.status"
              @change="handleStatusChange($event, contact.id)"
              class="bg-slate-950 border border-white/10 rounded-lg text-sm text-slate-300 px-3 py-2 outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <button 
              @click="confirmDelete(contact)"
              class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <UiConfirmModal 
      v-model="isDeleting"
      title="Delete Inquiry"
      :description="`Are you sure you want to delete the inquiry from ${contactToDelete?.name}? This action cannot be undone.`"
      confirm-text="Delete"
      @confirm="handleDelete"
    />

    <UiToast ref="toastRef" :title="toastTitle" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup>
import { Mail, Phone, Tag, Trash2 } from 'lucide-vue-next'

const contacts = ref([])
const loading = ref(true)
const filterStatus = ref('all')
const isDeleting = ref(false)
const contactToDelete = ref(null)
const toastRef = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastType = ref('success')

onMounted(() => {
  fetchContacts()
})

const fetchContacts = async () => {
  try {
    contacts.value = await $fetch('/api/contacts')
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
  } finally {
    loading.value = false
  }
}

const filteredContacts = computed(() => {
  if (filterStatus.value === 'all') return contacts.value
  return contacts.value.filter(c => c.status === filterStatus.value)
})

const handleStatusChange = (event, id) => {
  const status = event.target.value
  updateStatus(id, status)
}

const updateStatus = async (id, status) => {
  try {
    await $fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      body: { status }
    })
    
    // Update local state
    const contact = contacts.value.find(c => c.id === id)
    if (contact) contact.status = status
    
    toastTitle.value = 'Updated'
    toastMessage.value = 'Status updated successfully.'
    toastType.value = 'success'
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to update status.'
    toastType.value = 'error'
  }
  toastRef.value.show()
}

const confirmDelete = (contact) => {
  contactToDelete.value = contact
  isDeleting.value = true
}

const handleDelete = async () => {
  if (!contactToDelete.value) return
  
  try {
    await $fetch(`/api/contacts/${contactToDelete.value.id}`, { method: 'DELETE' })
    toastTitle.value = 'Deleted'
    toastMessage.value = 'Inquiry deleted.'
    toastType.value = 'success'
    fetchContacts()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to delete inquiry.'
    toastType.value = 'error'
  } finally {
    isDeleting.value = false
    contactToDelete.value = null
    toastRef.value.show()
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
