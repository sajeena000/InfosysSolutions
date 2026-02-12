/**
 * PayPal Payment Gateway Configuration
 * 
 * This module centralizes PayPal configuration management.
 * All PayPal-related endpoints should import from this file.
 */

export interface PaypalConfig {
  clientId: string
  clientSecret: string
  environment: 'sandbox' | 'production'
  apiUrl: string
}

/**
 * Get PayPal configuration from environment variables
 */
export function getPaypalConfig(): PaypalConfig {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const environment = (process.env.PAYPAL_ENV || 'sandbox') as 'sandbox' | 'production'

  if (!clientId || !clientSecret) {
    if (environment === 'sandbox') {
      console.warn('⚠️  Using default PayPal sandbox credentials. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env')
      // Default sandbox credentials (OPTIONAL: You might want to remove these before production)
      return {
        clientId: 'AeDXbuXv-5_bQ8g7w-1_d9c0_e1f2_g3h4_i5j6_k7l8', // Placeholder
        clientSecret: 'EMJ_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',      // Placeholder
        environment: 'sandbox',
        apiUrl: 'https://api-m.sandbox.paypal.com'
      }
    }
    
    throw new Error('Missing required PayPal configuration: PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set')
  }

  const apiUrl = environment === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

  return {
    clientId,
    clientSecret,
    environment,
    apiUrl
  }
}

/**
 * Get PayPal Access Token
 */
export async function getPaypalAccessToken(): Promise<string> {
  const config = getPaypalConfig()
  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')

  try {
    const response = await fetch(`${config.apiUrl}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to get PayPal access token: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('PayPal Auth Error:', error)
    throw error
  }
}
