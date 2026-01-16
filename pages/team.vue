<template>
  <div class="space-y-8 relative">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-display font-bold text-white mb-2">Team Members</h1>
        <p class="text-slate-400">Manage your squad permissions.</p>
      </div>
      
      <button 
        @click="showModal = true"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all"
      >
        + Add Member
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="member in filteredTeam" 
        :key="member.id || member.email" 
        class="group p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-slate-800/50 relative"
      >
        <button 
          @click="deleteMember(member.email)"
          class="absolute top-4 right-4 p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
          title="Remove Member"
        >
          <Trash2 class="w-4 h-4" />
        </button>

        <div class="flex items-start justify-between mb-4">
          <div class="relative">
            <img 
              :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`" 
              class="w-12 h-12 rounded-full bg-slate-800"
              alt="Avatar"
            />
            <div class="absolute -bottom-1 -right-1 w-3 h-3 border-2 border-slate-900 rounded-full" :class="member.online ? 'bg-emerald-500' : 'bg-slate-500'"></div>
          </div>
        </div>

        <div>
          <h3 class="text-white font-medium text-lg">{{ member.name }}</h3>
          <p class="text-indigo-400 text-sm mb-1">{{ member.role }}</p>
          <p class="text-slate-500 text-xs">{{ member.email }}</p>
        </div>

        <div class="mt-6 pt-4 border-t border-white/5 flex gap-2 flex-wrap">
          <span v-for="tag in member.tags" :key="tag" class="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="filteredTeam.length === 0" class="text-center py-20 border border-dashed border-white/10 rounded-2xl">
      <p class="text-slate-500">No team members found matching your search.</p>
      <button @click="store.searchQuery = ''" class="mt-2 text-indigo-400 hover:text-indigo-300 text-sm">Clear Search</button>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
        
        <div class="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden transform transition-all">
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

          <div class="relative z-10">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-display font-bold text-white">Add Team Member</h3>
              <button @click="showModal = false" class="text-slate-400 hover:text-white">
                <X class="w-5 h-5" />
              </button>
            </div>

            <form class="space-y-4" @submit.prevent="handleAdd">
              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Full Name</label>
                <input 
                  v-model="form.name" 
                  required
                  type="text" 
                  placeholder="e.g. John Doe" 
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
                />
              </div>
              
              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Email Address</label>
                <input 
                  v-model="form.email"
                  required
                  type="email" 
                  placeholder="john@dashboard.com" 
                  class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all" 
                />
              </div>

              <div class="space-y-1">
                <label class="text-sm font-medium text-slate-300">Role</label>
                <select v-model="form.role" class="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all">
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Product Designer</option>
                  <option>Intern</option>
                </select>
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
                  class="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <UiToast ref="toastRef" title="Success" message="Team member invited successfully." />

  </div>
</template>

<script setup>
import { MoreHorizontal, X, Trash2 } from 'lucide-vue-next'
import { useAppStore } from '~/stores/appStore'

const store = useAppStore()

const showModal = ref(false)
const toastRef = ref(null)

const form = ref({
  name: '',
  email: '',
  role: 'Frontend Developer'
})

const filteredTeam = computed(() => {
  if (!store.searchQuery) return store.team
  
  const query = store.searchQuery.toLowerCase()
  return store.team.filter(member => 
    member.name.toLowerCase().includes(query) || 
    member.role.toLowerCase().includes(query) ||
    member.email.toLowerCase().includes(query)
  )
})

const handleAdd = () => {
  store.addTeamMember({ ...form.value })
  
  showModal.value = false
  toastRef.value.show()
  
  form.value = { name: '', email: '', role: 'Frontend Developer' }
}

const deleteMember = (email) => {
  if (confirm(`Remove ${email} from the team?`)) {
    store.removeTeamMember(email)
  }
}
</script>