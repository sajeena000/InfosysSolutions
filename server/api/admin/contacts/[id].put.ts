import { db } from '../../../utils/db'
import { contactSubmissions } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const [updated] = await db
    .update(contactSubmissions)
    .set({
      status: body.status
    })
    .where(eq(contactSubmissions.id, id))
    .returning()

  return updated
})
