import { db } from '../../../utils/db'
import { projectSubmissions, notifications, activityLogs } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid payment ID' })
  }

  const validStatuses = ['pending', 'paid', 'failed', 'cancelled']
  if (!body.paymentStatus || !validStatuses.includes(body.paymentStatus)) {
    throw createError({ statusCode: 400, message: 'Invalid payment status' })
  }

  // Get the submission before updating
  const [existing] = await db
    .select()
    .from(projectSubmissions)
    .where(eq(projectSubmissions.id, id))

  if (!existing) {
    throw createError({ statusCode: 404, message: 'Payment not found' })
  }

  // Update the payment status
  const [updated] = await db
    .update(projectSubmissions)
    .set({ paymentStatus: body.paymentStatus })
    .where(eq(projectSubmissions.id, id))
    .returning()

  // If marked as paid, create notification + activity log
  if (body.paymentStatus === 'paid' && existing.paymentStatus !== 'paid') {
    await db.insert(notifications).values({
      text: `✅ Onsite payment of Rs. ${existing.amount.toLocaleString()} from ${existing.fullName} marked as paid`,
      type: 'success',
      color: 'bg-emerald-500',
    })

    await db.insert(activityLogs).values({
      text: `Onsite payment marked as paid: Rs. ${existing.amount.toLocaleString()} from ${existing.fullName} for "${existing.projectTitle}"`,
      type: 'success',
    })
  }

  return updated
})
