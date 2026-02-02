import { db } from '../../../utils/db'
import { events } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title || !body.eventDate) {
    throw createError({ statusCode: 400, message: 'Title and event date are required' })
  }

  const [newEvent] = await db
    .insert(events)
    .values({
      title: body.title,
      eventDate: new Date(body.eventDate),
      location: body.location || null,
      description: body.description || null,
      imageUrl: body.imageUrl || null
    })
    .returning()

  return newEvent
})
