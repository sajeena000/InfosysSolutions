import { db } from '../../utils/db'
import { projectSubmissions } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.fullName || !body.email || !body.projectTitle || !body.projectType || !body.pricingPackage || !body.description || !body.paymentMethod || !body.amount) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const [submission] = await db
    .insert(projectSubmissions)
    .values({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || null,
      companyName: body.companyName || null,
      projectTitle: body.projectTitle,
      projectType: body.projectType,
      pricingPackage: body.pricingPackage,
      description: body.description,
      timeline: body.timeline || null,
      paymentMethod: body.paymentMethod,
      paymentStatus: 'pending',
      amount: body.amount,
    })
    .returning()

  return submission
})
