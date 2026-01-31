import { db } from '../../utils/db'
import { projects, clients } from '../../database/schema'
import { desc, eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  // Join with clients to get client name for display
  const projectsList = await db
    .select({
      id: projects.id,
      name: projects.name,
      clientId: projects.clientId,
      clientName: clients.name,
      clientAvatar: clients.avatar,
      projectType: projects.projectType,
      pricingPackage: projects.pricingPackage,
      value: projects.value,
      status: projects.status,
      description: projects.description,
      startDate: projects.startDate,
      createdAt: projects.createdAt
    })
    .from(projects)
    .leftJoin(clients, eq(projects.clientId, clients.id))
    .orderBy(desc(projects.createdAt))

  return projectsList
})
