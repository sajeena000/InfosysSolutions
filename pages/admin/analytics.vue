<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-display font-bold text-white mb-2">Analytics</h1>
        <p class="text-slate-400">Business metrics and project insights.</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="downloadCSV"
          class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium border border-white/10 transition-colors"
        >
          Download CSV
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 relative overflow-hidden">
        <div class="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <p class="text-slate-400 text-sm mb-1">Pipeline Value</p>
        <p class="text-3xl font-display font-bold text-white">{{ formatCurrency(metrics.pipelineValue) }}</p>
        <p class="text-xs text-slate-500 mt-2">Pending projects waiting in queue</p>
      </div>
      
      <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 relative overflow-hidden">
        <div class="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <p class="text-slate-400 text-sm mb-1">Avg. Contract Value</p>
        <p class="text-3xl font-display font-bold text-white">{{ formatCurrency(metrics.avgContractValue) }}</p>
        <div class="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 w-[65%]"></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 relative overflow-hidden">
        <div class="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <p class="text-slate-400 text-sm mb-1">Client Retention</p>
        <p class="text-3xl font-display font-bold text-white">{{ metrics.retentionRate }}%</p>
        <div class="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-purple-500 transition-all duration-500" :style="{ width: metrics.retentionRate + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm flex flex-col">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-display font-semibold text-white">Revenue Trends</h2>
          <p class="text-xs text-slate-500 mt-1">Based on project start dates (active + completed)</p>
        </div>
      </div>
      
      <div class="h-64 w-full">
        <SimpleChart :data="chartData" />
      </div>
      
      <div class="mt-4 flex justify-between text-xs text-slate-500">
        <span v-for="(trend, index) in revenueTrends" :key="index" class="flex-1 text-center">
          {{ trend.month }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
        <h3 class="text-lg font-display font-semibold text-white mb-6">Top Clients</h3>
        <div class="space-y-5">
          <div v-for="client in topClients" :key="client.name" class="group">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-300 font-medium">{{ client.name }}</span>
              <span class="text-slate-400">{{ formatCurrency(client.value) }}</span>
            </div>
            <div class="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
              <div 
                class="h-full rounded-full transition-all duration-1000 group-hover:brightness-125"
                :class="client.color"
                :style="{ width: client.percentage + '%' }"
              ></div>
            </div>
          </div>
          <div v-if="topClients.length === 0" class="text-sm text-slate-500 italic text-center py-4">
            No project data available yet.
          </div>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
        <h3 class="text-lg font-display font-semibold text-white mb-6">Project Type Breakdown</h3>
        
        <div class="flex items-center gap-8 mb-8">
          <div class="relative w-40 h-40">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 32 32">
              <circle 
                v-for="(type, index) in projectTypes" 
                :key="type.name"
                r="16" 
                cx="16" 
                cy="16"
                fill="transparent"
                :stroke="type.strokeColor"
                stroke-width="6"
                :stroke-dasharray="`${type.dashArray} 100`"
                :stroke-dashoffset="`-${type.dashOffset}`"
                class="transition-all duration-500"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <p class="text-2xl font-bold text-white">{{ totalProjects }}</p>
                <p class="text-xs text-slate-500">Projects</p>
              </div>
            </div>
          </div>
          
          <div class="flex-1 space-y-3">
            <div v-for="type in projectTypes" :key="type.name" class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full" :class="type.bgColor"></div>
              <span class="text-sm text-slate-300 flex-1">{{ type.name }}</span>
              <span class="text-sm text-slate-400">{{ type.count }} ({{ type.percentage }}%)</span>
            </div>
          </div>
        </div>

        <p class="text-sm text-slate-400">
          {{ insights }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const metrics = ref({
  pipelineValue: 0,
  avgContractValue: 0,
  retentionRate: 0
})

const chartData = ref([])
const revenueTrends = ref([])
const topClients = ref([])
const projectTypes = ref([])
const totalProjects = ref(0)
const insights = ref('Loading insights...')

const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500']
const strokeColors = ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#f43f5e', '#0ea5e9']

const fetchData = async () => {
  try {
    const analyticsData = await $fetch('/api/analytics-stats')
    
    metrics.value = {
      pipelineValue: analyticsData.pipelineValue || 0,
      avgContractValue: analyticsData.avgContractValue || 0,
      retentionRate: analyticsData.retentionRate || 0
    }
    
    chartData.value = analyticsData.chartData || []
    revenueTrends.value = analyticsData.revenueTrends || []
    
    const maxClientValue = analyticsData.maxClientValue || 1
    topClients.value = (analyticsData.topClients || []).map((client, i) => ({
      ...client,
      color: colors[i % colors.length],
      percentage: Math.round((client.value / maxClientValue) * 100)
    }))
    
    let offset = 0
    projectTypes.value = (analyticsData.projectTypes || []).map((type, i) => {
      const dashArray = type.percentage
      const result = {
        ...type,
        bgColor: colors[i % colors.length],
        strokeColor: strokeColors[i % strokeColors.length],
        dashArray,
        dashOffset: offset
      }
      offset += dashArray
      return result
    })
    
    totalProjects.value = analyticsData.totalProjects || 0
    insights.value = analyticsData.insights || 'Add projects to see insights here.'
    
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    insights.value = 'Failed to load analytics data.'
  }
}

onMounted(() => {
  fetchData()
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const downloadCSV = () => {
  const headers = ['Month', 'Revenue', 'Chart Value (%)']
  
  const rows = revenueTrends.value.map((trend, index) => {
    return [trend.month, trend.value, chartData.value[index] || 0]
  })
  
  const summaryRows = [
    [],
    ['Summary Metrics'],
    ['Pipeline Value', metrics.value.pipelineValue],
    ['Avg Contract Value', metrics.value.avgContractValue],
    ['Retention Rate (%)', metrics.value.retentionRate],
    [],
    ['Top Clients'],
    ...topClients.value.map(c => [c.name, c.value]),
    [],
    ['Project Types'],
    ...projectTypes.value.map(t => [t.name, t.count, `${t.percentage}%`])
  ]
  
  const csvContent = [
    headers.join(','), 
    ...rows.map(row => row.join(',')),
    ...summaryRows.map(row => row.join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
