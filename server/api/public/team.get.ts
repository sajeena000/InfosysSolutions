import { db } from '../../utils/db'
import { teamMembers } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const members = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.isPublic, true))
  
  return members
})
