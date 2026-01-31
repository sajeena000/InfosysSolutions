import { db } from '../../utils/db'
import { events } from '../../database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const eventsList = await db
    .select()
    .from(events)
    .orderBy(desc(events.eventDate))
  
  return eventsList
})
