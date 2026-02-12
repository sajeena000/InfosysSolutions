import { db } from '../../utils/db'
import { projectSubmissions } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.fullName || !body.email || !body.projectTitle || !body.projectType || !body.pricingPackage || !body.description || !body.paymentMethod || !body.amount) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  // Validate Enums
  const validPackages = ['Basic', 'Professional', 'Enterprise', 'Custom'];
  if (!validPackages.includes(body.pricingPackage)) {
    console.error('Invalid pricing package received:', body.pricingPackage);
    throw createError({ statusCode: 400, message: `Invalid pricing package: ${body.pricingPackage}` });
  }

  const validProjectTypes = ['Web', 'Mobile', 'AI', 'DevOps', 'Consulting', 'Other'];
  if (!validProjectTypes.includes(body.projectType)) {
    throw createError({ statusCode: 400, message: `Invalid project type: ${body.projectType}` });
  }

  const validPaymentMethods = ['esewa', 'onsite', 'paypal'];
  if (!validPaymentMethods.includes(body.paymentMethod)) {
    throw createError({ statusCode: 400, message: `Invalid payment method: ${body.paymentMethod}` });
  }

  console.log('Inserting submission:', { ...body, amount: Number(body.amount) });

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
