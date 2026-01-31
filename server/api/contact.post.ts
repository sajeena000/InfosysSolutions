import { db } from '../utils/db'
import { contactSubmissions } from '../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email || !body.message) {
    throw createError({ statusCode: 400, message: 'Name, email, and message are required' })
  }

  const [submission] = await db
    .insert(contactSubmissions)
    .values({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      subject: body.subject || null,
      message: body.message,
      status: 'new'
    })
    .returning()

  return submission
})
