import { db } from '../../utils/db'
import { projects } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  await db.delete(projects).where(eq(projects.id, id))

  return { success: true }
})
