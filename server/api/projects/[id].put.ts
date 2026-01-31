import { db } from '../../utils/db'
import { projects } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const [updated] = await db
    .update(projects)
    .set({
      name: body.name,
      clientId: body.clientId,
      projectType: body.projectType,
      pricingPackage: body.pricingPackage,
      value: body.value,
      status: body.status,
      description: body.description,
      startDate: body.startDate ? new Date(body.startDate) : undefined
    })
    .where(eq(projects.id, id))
    .returning()

  return updated
})
