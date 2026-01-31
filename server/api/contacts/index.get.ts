import { db } from '../../utils/db'
import { contactSubmissions } from '../../database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const contacts = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt))
  
  return contacts
})
