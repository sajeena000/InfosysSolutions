import { db } from '../../utils/db'
import { projects } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.clientId) {
    throw createError({ statusCode: 400, message: 'Name and client are required' })
  }

  const [newProject] = await db
    .insert(projects)
    .values({
      name: body.name,
      clientId: body.clientId,
      projectType: body.projectType || 'Web',
      pricingPackage: body.pricingPackage || 'Basic',
      value: body.value || 0,
      status: body.status || 'pending',
      description: body.description || null,
      startDate: body.startDate ? new Date(body.startDate) : new Date()
    })
    .returning()

  return newProject
})
