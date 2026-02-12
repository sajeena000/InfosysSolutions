import { db } from '../../utils/db'
import { projectSubmissions } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { createHmac } from 'crypto'
import { getEsewaConfig } from '../../utils/esewa-config'

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

  // Get eSewa configuration
  const esewaConfig = getEsewaConfig()

  // Generate unique transaction UUID
  const transactionUuid = `TXN-${submission.id}-${Date.now()}`

  // Update submission with transaction ID
  await db
    .update(projectSubmissions)
    .set({ esewaTransactionId: transactionUuid })
    .where(eq(projectSubmissions.id, submission.id))

  // Build the signature message
  const totalAmount = submission.amount
  const signedFieldNames = 'total_amount,transaction_uuid,product_code'
  const signatureString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${esewaConfig.merchantCode}`

  // Generate HMAC-SHA256 signature
  const signature = createHmac('sha256', esewaConfig.secretKey)
    .update(signatureString)
    .digest('base64')

  // Build the base URL for callbacks
  const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000/infosys'

  return {
    esewaUrl: esewaConfig.apiUrl,
    formData: {
      amount: totalAmount,
      tax_amount: 0,
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: esewaConfig.merchantCode,
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: `${baseUrl}/api/public/esewa-verify`,
      failure_url: `${baseUrl}/payment/failure`,
      signed_field_names: signedFieldNames,
      signature: signature,
    }
  }
})
