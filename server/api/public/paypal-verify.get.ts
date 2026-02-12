import { db } from '../../utils/db'
import { projectSubmissions } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { getPaypalConfig, getPaypalAccessToken } from '../../utils/paypal-config'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const orderId = query.token as string // PayPal sends order ID as 'token' query param

  if (!orderId) {
    return sendRedirect(event, '/infosys/payment/failure?cause=missing_token')
  }

  try {
    const config = getPaypalConfig()
    const accessToken = await getPaypalAccessToken()

    // Capture the payment
    const response = await fetch(`${config.apiUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
        // If it's already captured, we might get a particular error, 
        // but generally if capture fails we fail the flow.
        console.error('PayPal Capture Failed:', data)
        return sendRedirect(event, '/infosys/payment/failure?cause=capture_failed')
    }

    if (data.status === 'COMPLETED') {
        // Find the submission by order ID
        // Note: We persisted orderId in initiate step
        
        // Update database
        await db
            .update(projectSubmissions)
            .set({ 
                paymentStatus: 'paid',
                // You might want to store capture ID too if needed, but order ID is usually sufficient
            })
            .where(eq(projectSubmissions.paypalOrderId, orderId))
            
        // Redirect to success
        // We might need to fetch the submission to get details for success page if needed,
        // or just pass basic info.
         const [submission] = await db
            .select()
            .from(projectSubmissions)
            .where(eq(projectSubmissions.paypalOrderId, orderId))
            
        const amount = submission?.amount || 0
        
        return sendRedirect(event, `/infosys/payment/success?txn=${orderId}&amount=${amount}&method=paypal`)
    } else {
        return sendRedirect(event, '/infosys/payment/failure?cause=not_completed')
    }

  } catch (error) {
    console.error('PayPal Verification Error:', error)
    return sendRedirect(event, '/infosys/payment/failure?cause=error')
  }
})
