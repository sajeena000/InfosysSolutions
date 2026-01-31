import { db } from '../../../utils/db'
import { blogPosts } from '../../../database/schema'
import { isNotNull, desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const blogs = await db
    .select()
    .from(blogPosts)
    .where(isNotNull(blogPosts.publishedAt))
    .orderBy(desc(blogPosts.publishedAt))
  
  return blogs
})
