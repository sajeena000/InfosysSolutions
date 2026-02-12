import { db } from '../../utils/db'
import { projectSubmissions } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { getPaypalConfig, getPaypalAccessToken } from '../../utils/paypal-config'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.submissionId) {
    throw createError({ statusCode: 400, message: 'submissionId is required' })
  }

  // Look up the submission
  const [submission] = await db
    .select()
    .from(projectSubmissions)
    .where(eq(projectSubmissions.id, body.submissionId))

  if (!submission) {
    throw createError({ statusCode: 404, message: 'Submission not found' })
  }

  // Get PayPal configuration and access token
  const config = getPaypalConfig()
  const accessToken = await getPaypalAccessToken()

  // Build the order payload
  // PayPal requires amount in specific format (2 decimal places usually)
  const amountValue = (submission.amount).toFixed(2)
  
  const orderPayload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: submission.id.toString(),
        amount: {
          currency_code: 'USD', // Assuming USD for international/PayPal, or convert NPR to USD if needed. For now sticking to configuration.
          value: amountValue
        },
        description: `Project: ${submission.projectTitle}`
      }
    ],
    application_context: {
      brand_name: 'Infosys Solutions',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      return_url: `${process.env.APP_BASE_URL || 'http://localhost:3000/infosys'}/api/public/paypal-verify`,
      cancel_url: `${process.env.APP_BASE_URL || 'http://localhost:3000/infosys'}/api/public/paypal-cancel`
    }
  }

  // Create Order
  try {
    const response = await fetch(`${config.apiUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(orderPayload)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('PayPal Order Creation Failed:', data)
      throw createError({ statusCode: 500, message: 'Failed to initiate PayPal payment' })
    }

    // Extract approval link
    const approvalLink = data.links.find((link: any) => link.rel === 'approve')?.href

    if (!approvalLink) {
      throw createError({ statusCode: 500, message: 'No approval link returned from PayPal' })
    }

    // Save Order ID to database
    await db
      .update(projectSubmissions)
      .set({ paypalOrderId: data.id })
      .where(eq(projectSubmissions.id, submission.id))

    return {
      approvalUrl: approvalLink,
      orderId: data.id
    }

  } catch (error) {
    console.error('PayPal Initiation Error:', error)
    throw createError({ statusCode: 500, message: 'Internal Server Error during PayPal initiation' })
  }
})
