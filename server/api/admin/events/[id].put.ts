import { db } from '../../../utils/db'
import { events } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const [updated] = await db
    .update(events)
    .set({
      title: body.title,
      eventDate: body.eventDate ? new Date(body.eventDate) : undefined,
      location: body.location,
      description: body.description,
      imageUrl: body.imageUrl
    })
    .where(eq(events.id, id))
    .returning()

  return updated
})
