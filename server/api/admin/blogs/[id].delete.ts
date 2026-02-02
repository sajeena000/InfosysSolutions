import { db } from '../../../utils/db'
import { blogPosts } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  await db.delete(blogPosts).where(eq(blogPosts.id, id))

  return { success: true }
})
