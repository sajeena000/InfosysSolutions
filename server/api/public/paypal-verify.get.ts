import { db } from '../../utils/db'
import { projectSubmissions, notifications, activityLogs } from '../../database/schema'
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
            })
            .where(eq(projectSubmissions.paypalOrderId, orderId))
            
        // Fetch the submission to get details for notification
         const [submission] = await db
            .select()
            .from(projectSubmissions)
            .where(eq(projectSubmissions.paypalOrderId, orderId))
            
        const amount = submission?.amount || 0

        // Notify admin — notification bell
        await db.insert(notifications).values({
          text: `💰 Payment received: Rs. ${amount.toLocaleString()} from ${submission?.fullName || 'a client'} via PayPal`,
          type: 'success',
          color: 'bg-emerald-500',
        })

        // Notify admin — activity log
        await db.insert(activityLogs).values({
          text: `Payment of Rs. ${amount.toLocaleString()} received via PayPal for "${submission?.projectTitle || 'Unknown project'}"`,
          type: 'success',
        })
        
        return sendRedirect(event, `/infosys/payment/success?txn=${orderId}&amount=${amount}&method=paypal`)
    } else {
        return sendRedirect(event, '/infosys/payment/failure?cause=not_completed')
    }

  } catch (error) {
    console.error('PayPal Verification Error:', error)
    return sendRedirect(event, '/infosys/payment/failure?cause=error')
  }
})
