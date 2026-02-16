import { db } from '../../utils/db'
import { projectSubmissions, notifications, activityLogs } from '../../database/schema'

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

  // Notify admin about the new project submission
  const methodLabel = body.paymentMethod === 'onsite' ? 'Onsite (pending visit)' : body.paymentMethod === 'paypal' ? 'PayPal' : 'eSewa'
  const isOnsite = body.paymentMethod === 'onsite'

  await db.insert(notifications).values({
    text: isOnsite
      ? `📋 New project submission from ${body.fullName} — onsite payment pending (Rs. ${Number(body.amount).toLocaleString()})`
      : `📋 New project submission from ${body.fullName} — paying Rs. ${Number(body.amount).toLocaleString()} via ${methodLabel}`,
    type: isOnsite ? 'info' : 'info',
    color: isOnsite ? 'bg-blue-500' : 'bg-indigo-500',
  })

  await db.insert(activityLogs).values({
    text: `New project "${body.projectTitle}" submitted by ${body.fullName} (${methodLabel} — Rs. ${Number(body.amount).toLocaleString()})`,
    type: 'info',
  })

  return submission
})
