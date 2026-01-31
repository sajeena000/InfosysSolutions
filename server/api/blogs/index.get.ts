import { db } from '../../utils/db'
import { blogPosts } from '../../database/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const blogs = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
  
  return blogs
})
