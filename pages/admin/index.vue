<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
      <p class="text-slate-400">Overview of your agency performance metrics.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AdminStatCard 
        title="Total Revenue" 
        :value="formatCurrency(stats.totalRevenue)" 
        :icon="DollarSign" 
      />
      
      <AdminStatCard 
        title="Team Members" 
        :value="stats.totalTeamMembers" 
        :icon="Users" 
      />
      
      <AdminStatCard 
        title="Total Projects" 
        :value="stats.totalProjects" 
        :icon="Briefcase" 
      />
      
      <AdminStatCard 
        title="Active Customers" 
        :value="stats.activeCustomers" 
        :icon="Building2" 
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-display font-semibold text-white">Revenue Overview</h2>
          <span class="text-xs text-slate-400">Last 12 Months</span>
        </div>
        
        <div class="h-64 w-full">
          <SharedSimpleChart :data="chartData" />
        </div>
        
        <!-- Month labels -->
        <div class="mt-4 flex justify-between text-xs text-slate-500">
          <span v-for="(trend, index) in stats.revenueTrends" :key="index" class="flex-1 text-center">
            {{ trend.month }}
          </span>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
        <h2 class="text-lg font-display font-semibold text-white mb-4">Recent Activity</h2>
        
        <div class="space-y-6 h-64 overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="activity in store.activities" :key="activity.id" class="flex gap-4 items-start">
            <div 
              class="w-2 h-2 mt-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] shrink-0"
              :class="{
                'bg-indigo-500': activity.type === 'info',
                'bg-emerald-500': activity.type === 'success',
                'bg-amber-500': activity.type === 'warning',
                'bg-rose-500': activity.type === 'error'
              }"
            ></div>
            
            <div>
              <p class="text-sm text-slate-300">{{ activity.text }}</p>
              <p class="text-xs text-slate-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>

          <div v-if="store.activities.length === 0" class="text-sm text-slate-500 italic text-center py-4">
            No recent activity recorded.
          </div>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <NuxtLink 
        to="/admin/blogs" 
        class="p-4 bg-slate-900/40 border border-white/5 rounded-xl hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <FileText class="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p class="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">Manage Blogs</p>
            <p class="text-xs text-slate-500">Create & edit posts</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink 
        to="/admin/events" 
        class="p-4 bg-slate-900/40 border border-white/5 rounded-xl hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Calendar class="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p class="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">Manage Events</p>
            <p class="text-xs text-slate-500">Schedule & organize</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink 
        to="/admin/contacts" 
        class="p-4 bg-slate-900/40 border border-white/5 rounded-xl hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group relative"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <Mail class="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p class="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Inquiries</p>
            <p class="text-xs text-slate-500">View messages</p>
          </div>
        </div>
        <span v-if="stats.newContacts > 0" class="absolute top-3 right-3 px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-full">
          {{ stats.newContacts }}
        </span>
      </NuxtLink>

      <NuxtLink 
        to="/admin/projects" 
        class="p-4 bg-slate-900/40 border border-white/5 rounded-xl hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all group"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <Briefcase class="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p class="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">Projects</p>
            <p class="text-xs text-slate-500">Track & manage</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { DollarSign, Users, Briefcase, Building2, FileText, Calendar, Mail } from 'lucide-vue-next'
import { useAppStore } from '~/stores/appStore'

const store = useAppStore()
const { formatCurrency } = useFormatters()

// Stats from API
const stats = ref({
  totalRevenue: 0,
  totalProjects: 0,
  activeCustomers: 0,
  newContacts: 0,
  chartData: [],
  revenueTrends: []
})

const fetchData = async () => {
  try {
    // Fetch dashboard stats
    const dashboardStats = await $fetch('/api/admin/dashboard-stats')
    stats.value = dashboardStats
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
  }
}

onMounted(() => {
  fetchData()
})

const chartData = computed(() => {
  return stats.value.chartData || []
})
</script>
