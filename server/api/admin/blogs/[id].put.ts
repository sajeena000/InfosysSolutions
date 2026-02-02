import { db } from '../../../utils/db'
import { blogPosts } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const [updated] = await db
    .update(blogPosts)
    .set({
      title: body.title,
      slug: body.slug,
      coverImage: body.coverImage,
      excerpt: body.excerpt,
      content: body.content,
      publishedAt: body.published ? new Date() : null,
      updatedAt: new Date()
    })
    .where(eq(blogPosts.id, id))
    .returning()

  return updated
})
