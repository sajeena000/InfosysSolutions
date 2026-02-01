<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-display font-bold text-white mb-2">Projects</h1>
        <p class="text-slate-400">Track and manage client projects.</p>
      </div>
      
      <div class="flex items-center gap-4 flex-wrap">
        <select 
          v-model="filterStatus"
          class="bg-slate-900/50 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select 
          v-model="filterType"
          class="bg-slate-900/50 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50"
        >
          <option value="all">All Types</option>
          <option value="Web Development">Web</option>
          <option value="Mobile App">Mobile</option>
          <option value="AI/ML">AI/ML</option>
          <option value="DevOps">DevOps</option>
          <option value="Consulting">Consulting</option>
        </select>

        <button 
          @click="openModal()"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all"
        >
          + New Project
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 rounded-xl bg-slate-900/40 border border-white/5">
        <p class="text-slate-500 text-xs uppercase tracking-wider">Total Value</p>
        <p class="text-2xl font-display font-bold text-white">{{ formatCurrency(projectsStats.totalValue) }}</p>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/40 border border-white/5">
        <p class="text-slate-500 text-xs uppercase tracking-wider">Active</p>
        <p class="text-2xl font-display font-bold text-emerald-400">{{ projectsStats.active }}</p>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/40 border border-white/5">
        <p class="text-slate-500 text-xs uppercase tracking-wider">Pending</p>
        <p class="text-2xl font-display font-bold text-amber-400">{{ projectsStats.pending }}</p>
      </div>
      <div class="p-4 rounded-xl bg-slate-900/40 border border-white/5">
        <p class="text-slate-500 text-xs uppercase tracking-wider">Completed</p>
        <p class="text-2xl font-display font-bold text-indigo-400">{{ projectsStats.completed }}</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-slate-500 mt-4">Loading projects...</p>
    </div>

    <div v-else-if="projects.length === 0" class="text-center py-20 border border-dashed border-white/10 rounded-2xl">
      <Briefcase class="w-12 h-12 text-slate-500 mx-auto mb-4" />
      <p class="text-slate-400 mb-2">No projects yet</p>
      <button 
        @click="openModal()"
        class="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
      >
        Create your first project
      </button>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-left text-xs uppercase tracking-wider text-slate-500">
            <th class="p-4">Project</th>
            <th class="p-4">Client</th>
            <th class="p-4">Type</th>
            <th class="p-4">Package</th>
            <th class="p-4">Value</th>
            <th class="p-4">Status</th>
            <th class="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr 
            v-for="project in projects" 
            :key="project.id"
            class="hover:bg-white/5 transition-colors"
          >
            <td class="p-4">
              <p class="text-white font-medium">{{ project.name }}</p>
              <p class="text-slate-500 text-xs">{{ formatDate(project.startDate || project.createdAt) }}</p>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-2">
                <img 
                  v-if="project.clientAvatar" 
                  :src="project.clientAvatar" 
                  class="w-6 h-6 rounded-full bg-slate-700"
                  :alt="project.clientName"
                />
                <span class="text-slate-300">{{ project.clientName || 'Unknown' }}</span>
              </div>
            </td>
            <td class="p-4">
              <span class="px-2 py-1 bg-white/5 text-slate-400 text-xs rounded-lg">
                {{ project.projectType }}
              </span>
            </td>
            <td class="p-4">
              <span 
                class="px-2 py-1 text-xs rounded-lg"
                :class="{
                  'bg-slate-500/20 text-slate-300': project.pricingPackage === 'Basic',
                  'bg-blue-500/20 text-blue-400': project.pricingPackage === 'Professional',
                  'bg-purple-500/20 text-purple-400': project.pricingPackage === 'Enterprise',
                  'bg-amber-500/20 text-amber-400': project.pricingPackage === 'Custom'
                }"
              >
                {{ project.pricingPackage || 'Basic' }}
              </span>
            </td>
            <td class="p-4 text-white font-medium">{{ formatCurrency(project.value) }}</td>
            <td class="p-4">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full capitalize"
                :class="{
                  'bg-emerald-500/20 text-emerald-400': project.status === 'active',
                  'bg-amber-500/20 text-amber-400': project.status === 'pending',
                  'bg-indigo-500/20 text-indigo-400': project.status === 'completed',
                  'bg-rose-500/20 text-rose-400': project.status === 'cancelled'
                }"
              >
                {{ project.status }}
              </span>
            </td>
            <td class="p-4">
              <div class="flex justify-end gap-2">
                <button 
                  @click="openModal(project)"
                  class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Pencil class="w-4 h-4" />
                </button>
                <button 
                  @click="confirmDelete(project)"
                  class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
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

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
        
        <div class="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-display font-bold text-white">
              {{ isEditing ? 'Edit Project' : 'Create Project' }}
            </h3>
            <button @click="showModal = false" class="text-slate-400 hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Project Name</label>
              <input 
                v-model="form.name" 
                required
                type="text" 
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Client</label>
              <div class="relative">
                <select 
                  v-model="form.clientId"
                  required
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a client...</option>
                  <option 
                    v-for="client in clientsList" 
                    :key="client.id" 
                    :value="client.id"
                  >
                    {{ client.name }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <button 
                type="button"
                @click="showNewClientModal = true"
                class="text-xs text-indigo-400 hover:text-indigo-300 mt-1"
              >
                + Create new client
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Project Type</label>
                <select 
                  v-model="form.projectType"
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                >
                  <option>Web</option>
                  <option>Mobile</option>
                  <option>AI</option>
                  <option>DevOps</option>
                  <option>Consulting</option>
                  <option>Other</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Pricing Package</label>
                <select 
                  v-model="form.pricingPackage"
                  @change="onPricingPackageChange"
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                >
                  <option value="Basic">Basic ($2,999)</option>
                  <option value="Professional">Professional ($9,999)</option>
                  <option value="Enterprise">Enterprise ($15k-$50k)</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Value ($)</label>
                <input 
                  v-model.number="form.value" 
                  type="number" 
                  min="0"
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
                />
              </div>

              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Status</label>
                <select 
                  v-model="form.status"
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Start Date</label>
              <input 
                v-model="form.startDate" 
                type="date" 
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Description</label>
              <textarea 
                v-model="form.description"
                rows="3"
                placeholder="Project details..."
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none" 
              ></textarea>
            </div>

            <div class="pt-4 flex gap-3">
              <button 
                type="button"
                @click="showModal = false" 
                class="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="saving"
                class="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-70"
              >
                {{ saving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Project') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- New Client Modal -->
    <Teleport to="body">
      <div v-if="showNewClientModal" class="fixed inset-0 z-[110] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showNewClientModal = false"></div>
        
        <div class="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-display font-bold text-white">Create New Client</h3>
            <button @click="showNewClientModal = false" class="text-slate-400 hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <form class="space-y-4" @submit.prevent="handleCreateClient">
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Company Name</label>
              <input 
                v-model="newClient.name" 
                required
                type="text" 
                placeholder="Acme Corporation"
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Contact Email</label>
              <input 
                v-model="newClient.email" 
                required
                type="email" 
                placeholder="contact@company.com"
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div class="pt-4 flex gap-3">
              <button 
                type="button"
                @click="showNewClientModal = false" 
                class="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="savingClient"
                class="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-70"
              >
                {{ savingClient ? 'Creating...' : 'Create Client' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <UiConfirmModal 
      v-model="isDeleting"
      title="Delete Project"
      :description="`Are you sure you want to delete '${projectToDelete?.name}'? This action cannot be undone.`"
      confirm-text="Delete"
      @confirm="handleDelete"
    />

    <UiToast ref="toastRef" :title="toastTitle" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup>
import { Briefcase, Pencil, Trash2, X, ChevronDown } from 'lucide-vue-next'
import { useAppStore } from '~/stores/appStore'

const store = useAppStore()

// Pricing package values
const PRICING_VALUES = {
  Basic: 2999,
  Professional: 9999,
  Enterprise: 25000,
  Custom: 0
}

const projects = ref([])
const clientsList = ref([])
const loading = ref(true)
const showModal = ref(false)
const showNewClientModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const savingClient = ref(false)
const isDeleting = ref(false)
const projectToDelete = ref(null)
const toastRef = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastType = ref('success')

const form = ref({
  id: null,
  name: '',
  clientId: '',
  projectType: 'Web',
  pricingPackage: 'Basic',
  value: 2999,
  status: 'pending',
  description: '',
  startDate: new Date().toISOString().split('T')[0]
})

const newClient = ref({
  name: '',
  email: ''
})

onMounted(() => {
  fetchProjects()
  fetchClients()
})

const fetchClients = async () => {
  try {
    clientsList.value = await $fetch('/api/clients')
  } catch (error) {
    console.error('Failed to fetch clients:', error)
  }
}

const currentPage = ref(1)
const totalItems = ref(0)
const itemsPerPage = ref(10)
const filterStatus = ref('all')
const filterType = ref('all')
const projectsStats = ref({
  totalValue: 0,
  active: 0,
  pending: 0,
  completed: 0
})

const fetchProjects = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/projects', {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
        status: filterStatus.value,
        type: filterType.value,
        search: store.searchQuery
      }
    })
    projects.value = response.data
    totalItems.value = response.meta.total
    if (response.meta.stats) {
      projectsStats.value = response.meta.stats
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  } finally {
    loading.value = false
  }
}

watch([currentPage, filterStatus, filterType, () => store.searchQuery], () => {
  fetchProjects()
})

watch([filterStatus, filterType, () => store.searchQuery], () => {
  currentPage.value = 1
})

const onPricingPackageChange = () => {
  const pkg = form.value.pricingPackage
  if (pkg !== 'Custom') {
    form.value.value = PRICING_VALUES[pkg]
  }
}

const openModal = (project = null) => {
  if (project) {
    isEditing.value = true
    form.value = {
      id: project.id,
      name: project.name,
      clientId: project.clientId,
      projectType: project.projectType,
      pricingPackage: project.pricingPackage || 'Basic',
      value: project.value || 0,
      status: project.status,
      description: project.description || '',
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }
  } else {
    isEditing.value = false
    form.value = {
      id: null,
      name: '',
      clientId: '',
      projectType: 'Web',
      pricingPackage: 'Basic',
      value: 2999,
      status: 'pending',
      description: '',
      startDate: new Date().toISOString().split('T')[0]
    }
  }
  showModal.value = true
}

const handleSubmit = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      await $fetch(`/api/projects/${form.value.id}`, {
        method: 'PUT',
        body: form.value
      })
      toastTitle.value = 'Updated'
      toastMessage.value = 'Project updated successfully.'
    } else {
      await $fetch('/api/projects', {
        method: 'POST',
        body: form.value
      })
      toastTitle.value = 'Created'
      toastMessage.value = 'Project created successfully.'
    }
    toastType.value = 'success'
    showModal.value = false
    fetchProjects()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to save project.'
    toastType.value = 'error'
    console.error(error)
  } finally {
    saving.value = false
    toastRef.value.show()
  }
}

const handleCreateClient = async () => {
  savingClient.value = true
  try {
    const created = await $fetch('/api/clients', {
      method: 'POST',
      body: newClient.value
    })
    
    // Add to clients list and select it
    clientsList.value.unshift(created)
    form.value.clientId = created.id
    
    // Reset and close
    newClient.value = { name: '', email: '' }
    showNewClientModal.value = false
    
    toastTitle.value = 'Client Created'
    toastMessage.value = `${created.name} has been added.`
    toastType.value = 'success'
    toastRef.value.show()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to create client.'
    toastType.value = 'error'
    console.error(error)
    toastRef.value.show()
  } finally {
    savingClient.value = false
  }
}

const confirmDelete = (project) => {
  projectToDelete.value = project
  isDeleting.value = true
}

const handleDelete = async () => {
  if (!projectToDelete.value) return
  
  try {
    await $fetch(`/api/projects/${projectToDelete.value.id}`, { method: 'DELETE' })
    toastTitle.value = 'Deleted'
    toastMessage.value = 'Project deleted.'
    toastType.value = 'success'
    fetchProjects()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to delete project.'
    toastType.value = 'error'
  } finally {
    isDeleting.value = false
    projectToDelete.value = null
    toastRef.value.show()
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value || 0)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
