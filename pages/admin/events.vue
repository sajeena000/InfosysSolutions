<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-display font-bold text-white mb-2">Events</h1>
        <p class="text-slate-400">Manage company events and conferences.</p>
      </div>
      
      <button 
        @click="openModal()"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all"
      >
        + New Event
      </button>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-slate-500 mt-4">Loading events...</p>
    </div>

    <div v-else-if="events.length === 0" class="text-center py-20 border border-dashed border-white/10 rounded-2xl">
      <Calendar class="w-12 h-12 text-slate-500 mx-auto mb-4" />
      <p class="text-slate-400 mb-2">No events scheduled</p>
      <button 
        @click="openModal()"
        class="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
      >
        Create your first event
      </button>
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="event in events" 
        :key="event.id"
        class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all group relative"
      >
        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button 
            @click="openModal(event)"
            class="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil class="w-4 h-4" />
          </button>
          <button 
            @click="confirmDelete(event)"
            class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>

        <div 
          class="w-14 h-14 rounded-xl flex flex-col items-center justify-center mb-4"
          :class="isPast(event.eventDate) ? 'bg-slate-700' : 'bg-gradient-to-br from-indigo-600 to-purple-600'"
        >
          <span class="text-white text-xs uppercase">{{ formatMonth(event.eventDate) }}</span>
          <span class="text-white text-lg font-bold">{{ formatDay(event.eventDate) }}</span>
        </div>

        <h3 class="text-white font-medium text-lg mb-1">{{ event.title }}</h3>
        
        <div v-if="event.location" class="flex items-center gap-2 text-slate-500 text-sm mb-3">
          <MapPin class="w-4 h-4" />
          <span class="truncate">{{ event.location }}</span>
        </div>

        <p v-if="event.description" class="text-slate-400 text-sm line-clamp-2">
          {{ event.description }}
        </p>

        <div class="mt-4 pt-4 border-t border-white/5">
          <span 
            class="px-3 py-1 text-xs font-medium rounded-full"
            :class="isPast(event.eventDate) 
              ? 'bg-slate-500/20 text-slate-400' 
              : 'bg-emerald-500/20 text-emerald-400'"
          >
            {{ isPast(event.eventDate) ? 'Past' : 'Upcoming' }}
          </span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
        
        <div class="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-display font-bold text-white">
              {{ isEditing ? 'Edit Event' : 'Create Event' }}
            </h3>
            <button @click="showModal = false" class="text-slate-400 hover:text-white">
              <X class="w-5 h-5" />
            </button>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Event Title</label>
              <input 
                v-model="form.title" 
                required
                type="text" 
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Event Date</label>
                <input 
                  v-model="form.eventDate" 
                  required
                  type="date" 
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
                />
              </div>

              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Location</label>
                <input 
                  v-model="form.location" 
                  type="text" 
                  placeholder="e.g. San Francisco, CA"
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Image URL</label>
              <input 
                v-model="form.imageUrl" 
                type="url" 
                placeholder="https://..."
                class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-300">Description</label>
              <textarea 
                v-model="form.description"
                rows="3"
                placeholder="Describe the event..."
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
                {{ saving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Event') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <UiConfirmModal 
      v-model="isDeleting"
      title="Delete Event"
      :description="`Are you sure you want to delete '${eventToDelete?.title}'? This action cannot be undone.`"
      confirm-text="Delete"
      @confirm="handleDelete"
    />

    <UiToast ref="toastRef" :title="toastTitle" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup>
import { Calendar, MapPin, Pencil, Trash2, X } from 'lucide-vue-next'

const events = ref([])
const loading = ref(true)
const showModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const isDeleting = ref(false)
const eventToDelete = ref(null)
const toastRef = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastType = ref('success')

const form = ref({
  id: null,
  title: '',
  eventDate: '',
  location: '',
  imageUrl: '',
  description: ''
})

onMounted(() => {
  fetchEvents()
})

const fetchEvents = async () => {
  try {
    events.value = await $fetch('/api/events')
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
}

const openModal = (event = null) => {
  if (event) {
    isEditing.value = true
    form.value = {
      id: event.id,
      title: event.title,
      eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
      location: event.location || '',
      imageUrl: event.imageUrl || '',
      description: event.description || ''
    }
  } else {
    isEditing.value = false
    form.value = {
      id: null,
      title: '',
      eventDate: '',
      location: '',
      imageUrl: '',
      description: ''
    }
  }
  showModal.value = true
}

const handleSubmit = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      await $fetch(`/api/events/${form.value.id}`, {
        method: 'PUT',
        body: form.value
      })
      toastTitle.value = 'Updated'
      toastMessage.value = 'Event updated successfully.'
    } else {
      await $fetch('/api/events', {
        method: 'POST',
        body: form.value
      })
      toastTitle.value = 'Created'
      toastMessage.value = 'Event created successfully.'
    }
    toastType.value = 'success'
    showModal.value = false
    fetchEvents()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to save event.'
    toastType.value = 'error'
    console.error(error)
  } finally {
    saving.value = false
    toastRef.value.show()
  }
}

const confirmDelete = (event) => {
  eventToDelete.value = event
  isDeleting.value = true
}

const handleDelete = async () => {
  if (!eventToDelete.value) return
  
  try {
    await $fetch(`/api/events/${eventToDelete.value.id}`, { method: 'DELETE' })
    toastTitle.value = 'Deleted'
    toastMessage.value = 'Event deleted.'
    toastType.value = 'success'
    fetchEvents()
  } catch (error) {
    toastTitle.value = 'Error'
    toastMessage.value = 'Failed to delete event.'
    toastType.value = 'error'
  } finally {
    isDeleting.value = false
    eventToDelete.value = null
    toastRef.value.show()
  }
}

const isPast = (dateString) => {
  if (!dateString) return false
  return new Date(dateString) < new Date()
}

const formatMonth = (dateString) => {
  if (!dateString) return '--'
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short' })
}

const formatDay = (dateString) => {
  if (!dateString) return '--'
  return new Date(dateString).getDate()
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
