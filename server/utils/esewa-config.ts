/**
 * eSewa Payment Gateway Configuration
 * 
 * This module centralizes eSewa configuration management.
 * All eSewa-related endpoints should import from this file.
 */

export interface EsewaConfig {
  merchantCode: string
  secretKey: string
  environment: 'development' | 'production'
  apiUrl: string
}

/**
 * Get eSewa configuration from environment variables
 * Throws an error if required variables are missing in production
 */
export function getEsewaConfig(): EsewaConfig {
  const merchantCode = process.env.ESEWA_MERCHANT_CODE
  const secretKey = process.env.ESEWA_SECRET_KEY
  const environment = (process.env.ESEWA_ENV || 'development') as 'development' | 'production'

  // Validate required configuration
  if (!merchantCode || !secretKey) {
    // In development, provide defaults for testing
    if (environment === 'development') {
      console.warn('⚠️  Using default eSewa test credentials. Set ESEWA_MERCHANT_CODE and ESEWA_SECRET_KEY in .env')
      return {
        merchantCode: 'EPAYTEST',
        secretKey: '8gBm/:&EnhH.1/q',
        environment: 'development',
        apiUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
      }
    }
    
    // In production, fail fast
    throw new Error('Missing required eSewa configuration: ESEWA_MERCHANT_CODE and ESEWA_SECRET_KEY must be set')
  }

  // Determine API URL based on environment
  const apiUrl = environment === 'production'
    ? 'https://epay.esewa.com.np/api/epay/main/v2/form'
    : 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'

  return {
    merchantCode,
    secretKey,
    environment,
    apiUrl
  }
}

/**
 * Validate eSewa configuration on server startup
 * Call this during application initialization
 */
export function validateEsewaConfig(): void {
  try {
    const config = getEsewaConfig()
    console.log(`✅ eSewa configured for ${config.environment} environment`)
    console.log(`   Merchant Code: ${config.merchantCode}`)
    console.log(`   API URL: ${config.apiUrl}`)
  } catch (error) {
    console.error('❌ eSewa configuration error:', error)
    if (process.env.ESEWA_ENV === 'production') {
      throw error // Fail fast in production
    }
  }
}
