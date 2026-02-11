import { db } from '../../utils/db'
import { projectSubmissions } from '../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // eSewa sends the response data as a base64-encoded JSON string in the 'data' query param
  const encodedData = query.data as string

  if (!encodedData) {
    // No data — redirect to failure
    return sendRedirect(event, '/infosys/payment/failure')
  }

  try {
    // Decode the base64 response
    const decodedString = Buffer.from(encodedData, 'base64').toString('utf-8')
    const responseData = JSON.parse(decodedString)

    // responseData contains: transaction_code, status, total_amount, transaction_uuid, product_code, signed_field_names, signature
    const { status, transaction_uuid, transaction_code } = responseData

    if (status === 'COMPLETE' && transaction_uuid) {
      // Update payment status in database
      await db
        .update(projectSubmissions)
        .set({
          paymentStatus: 'paid',
          esewaTransactionId: transaction_code || transaction_uuid,
        })
        .where(eq(projectSubmissions.esewaTransactionId, transaction_uuid))

      // Redirect to success page with transaction info
      const successUrl = `/infosys/payment/success?txn=${transaction_code || transaction_uuid}&amount=${responseData.total_amount}`
      return sendRedirect(event, successUrl)
    } else {
      // Payment not complete
      return sendRedirect(event, '/infosys/payment/failure')
    }
  } catch (error) {
    console.error('eSewa verification error:', error)
    return sendRedirect(event, '/infosys/payment/failure')
  }
})
