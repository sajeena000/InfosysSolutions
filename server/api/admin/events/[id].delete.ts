import { db } from '../../../utils/db'
import { events } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  await db.delete(events).where(eq(events.id, id))

  return { success: true }
})
