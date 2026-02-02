import { db } from '../../../utils/db'
import { contactSubmissions } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id))

  return { success: true }
})
