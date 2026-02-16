import { db } from '../../../utils/db'
import { projectSubmissions } from '../../../database/schema'
import { desc, count, eq, ilike, or, and } from 'drizzle-orm'
import { getPaginationParams, paginateResize } from '../../../utils/pagination'

export default defineEventHandler(async (event) => {
  const { page, limit, offset } = getPaginationParams(event)
  const query = getQuery(event)
  const status = query.status as string
  const method = query.method as string
  const search = query.search as string

  const conditions = []

  // Filter by payment status
  if (status && status !== 'all') {
    conditions.push(eq(projectSubmissions.paymentStatus, status as any))
  }

  // Filter by payment method
  if (method && method !== 'all') {
    conditions.push(eq(projectSubmissions.paymentMethod, method as any))
  }

  // Search by name, email, or project title
  if (search) {
    const searchPattern = `%${search}%`
    conditions.push(or(
      ilike(projectSubmissions.fullName, searchPattern),
      ilike(projectSubmissions.email, searchPattern),
      ilike(projectSubmissions.projectTitle, searchPattern)
    ))
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  const [total] = await db.select({ count: count() }).from(projectSubmissions).where(whereClause)

  const payments = await db
    .select()
    .from(projectSubmissions)
    .where(whereClause)
    .orderBy(desc(projectSubmissions.createdAt))
    .limit(limit)
    .offset(offset)

  return paginateResize(payments, Number(total?.count || 0), page, limit)
})
