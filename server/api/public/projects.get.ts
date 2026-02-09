import { db } from '../../utils/db'
import { projects, clients } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const completedProjects = await db
    .select({
      id: projects.id,
      name: projects.name,
      projectType: projects.projectType,
      description: projects.description,
      clientName: clients.name,
    })
    .from(projects)
    .leftJoin(clients, eq(projects.clientId, clients.id))
    .where(eq(projects.status, 'completed'))
  
  return completedProjects
})
