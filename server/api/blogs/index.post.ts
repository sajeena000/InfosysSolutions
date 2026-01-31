import { db } from '../../utils/db'
import { blogPosts } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title || !body.slug || !body.content) {
    throw createError({ statusCode: 400, message: 'Title, slug, and content are required' })
  }

  const [newPost] = await db
    .insert(blogPosts)
    .values({
      title: body.title,
      slug: body.slug,
      coverImage: body.coverImage || null,
      excerpt: body.excerpt || null,
      content: body.content,
      authorId: 1, // Default author for now
      publishedAt: body.published ? new Date() : null
    })
    .returning()

  return newPost
})
