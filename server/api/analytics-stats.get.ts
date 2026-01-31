import { db } from '../utils/db'
import { projects, clients } from '../database/schema'
import { sql, desc, eq, inArray, and, gte } from 'drizzle-orm'

interface ClientData {
  name: string
  value: number
}

interface ProjectTypeData {
  name: string
  count: number
  percentage: number
}

interface RevenueTrendPoint {
  month: string
  value: number
}

export default defineEventHandler(async () => {
  // ========================
  // 1. PIPELINE VALUE (sum of pending projects)
  // ========================
  const pipelineResult = await db
    .select({
      total: sql<number>`COALESCE(SUM(${projects.value}), 0)`
    })
    .from(projects)
    .where(eq(projects.status, 'pending'))

  const pipelineValue = Number(pipelineResult[0]?.total || 0)

  // ========================
  // 2. AVG CONTRACT VALUE (active + completed only)
  // ========================
  const avgContractResult = await db
    .select({
      total: sql<number>`COALESCE(SUM(${projects.value}), 0)`,
      count: sql<number>`COUNT(*)`
    })
    .from(projects)
    .where(inArray(projects.status, ['active', 'completed']))

  const totalValue = Number(avgContractResult[0]?.total || 0)
  const projectCount = Number(avgContractResult[0]?.count || 0)
  const avgContractValue = projectCount > 0 ? Math.round(totalValue / projectCount) : 0

  // ========================
  // 3. CLIENT RETENTION RATE
  // (Clients with >1 project) / (Clients with >=1 project) * 100
  // ========================
  const clientProjectCounts = await db
    .select({
      clientId: projects.clientId,
      count: sql<number>`COUNT(*)`
    })
    .from(projects)
    .groupBy(projects.clientId)

  const clientsWithProjects = clientProjectCounts.length
  const clientsWithMultipleProjects = clientProjectCounts.filter(c => Number(c.count) > 1).length
  const retentionRate = clientsWithProjects > 0
    ? Math.round((clientsWithMultipleProjects / clientsWithProjects) * 100)
    : 0

  // ========================
  // 4. TOP CLIENTS (by total project value, limit 5)
  // ========================
  const topClientsData = await db
    .select({
      clientId: projects.clientId,
      clientName: clients.name,
      value: sql<number>`SUM(${projects.value})`
    })
    .from(projects)
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .groupBy(projects.clientId, clients.name)
    .orderBy(desc(sql`SUM(${projects.value})`))
    .limit(5)

  const maxClientValue = topClientsData.length > 0
    ? Math.max(...topClientsData.map(c => Number(c.value || 0)))
    : 1

  const topClients: ClientData[] = topClientsData.map(c => ({
    name: c.clientName,
    value: Number(c.value || 0)
  }))

  // ========================
  // 5. PROJECT TYPE BREAKDOWN
  // ========================
  const projectTypesData = await db
    .select({
      name: projects.projectType,
      count: sql<number>`COUNT(*)`
    })
    .from(projects)
    .groupBy(projects.projectType)

  const totalProjects = projectTypesData.reduce((sum, t) => sum + Number(t.count), 0)

  const projectTypes: ProjectTypeData[] = projectTypesData.map(t => ({
    name: t.name,
    count: Number(t.count),
    percentage: totalProjects > 0 ? Math.round((Number(t.count) / totalProjects) * 100) : 0
  }))

  // ========================
  // 6. REVENUE TRENDS (grouped by month, using start_date)
  // Only active + completed projects
  // ========================
  const revenueTrendsData = await db
    .select({
      month: sql<string>`TO_CHAR(${projects.startDate}, 'YYYY-MM')`,
      value: sql<number>`SUM(${projects.value})`
    })
    .from(projects)
    .where(inArray(projects.status, ['active', 'completed']))
    .groupBy(sql`TO_CHAR(${projects.startDate}, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(${projects.startDate}, 'YYYY-MM')`)

  // Normalize to last 12 months for chart display
  const now = new Date()
  const monthlyTrends: RevenueTrendPoint[] = []

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    const found = revenueTrendsData.find(r => r.month === monthKey)

    monthlyTrends.push({
      month: monthName,
      value: Number(found?.value || 0)
    })
  }

  // Convert to chart-friendly number array (normalized 0-100 for SimpleChart)
  const maxRevenue = Math.max(...monthlyTrends.map(t => t.value), 1)
  const chartData = monthlyTrends.map(t => Math.round((t.value / maxRevenue) * 100))

  // ========================
  // 7. DYNAMIC INSIGHTS
  // ========================
  let insights = ''

  if (projectTypes.length > 0) {
    const topType = projectTypes.reduce((a, b) => a.percentage > b.percentage ? a : b)

    if (topType.name === 'Web' && topType.percentage > 50) {
      insights = 'Web development remains our strongest revenue driver.'
    } else if (retentionRate > 80) {
      insights = 'Exceptional client loyalty observed this period.'
    } else {
      insights = `${topType.name} projects make up ${topType.percentage}% of our portfolio.`
    }
  } else {
    insights = 'Start adding projects to see insights here.'
  }

  return {
    // Metrics
    pipelineValue,
    avgContractValue,
    retentionRate,

    // Top Clients
    topClients,
    maxClientValue,

    // Project Types
    projectTypes,
    totalProjects,

    // Revenue Trends
    revenueTrends: monthlyTrends,
    chartData,

    // Insights
    insights
  }
})
