import { db } from '../../../utils/db'
import { blogPosts } from '../../../database/schema'
import { eq, isNotNull, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Slug is required' })
  }

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(
      eq(blogPosts.slug, slug),
      isNotNull(blogPosts.publishedAt)
    ))
  
  if (!post) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }

  return post
})
