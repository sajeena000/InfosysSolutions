import { generateSecret, generateURI, verify } from 'otplib';
import QRCode from 'qrcode';

/**
 * Generates a new 2FA secret for a user.
 * @param email - The user's email address (for the issuer label)
 * @returns Object containing the secret and the OTPAuth URL
 */
export function generateTwoFactorSecret(email: string) {
    const secret = generateSecret();
    const otpauth = generateURI({ issuer: 'Infosys Dashboard', label: email, secret });
    return { secret, otpauth };
}

/**
 * Generates a QR code data URL from an OTPAuth URL.
 * @param otpauth - The OTPAuth URL
 * @returns Promise resolving to the data URL of the QR code
 */
export async function generateTwoFactorQRCode(otpauth: string): Promise<string> {
    return QRCode.toDataURL(otpauth);
}

/**
 * Verifies a 2FA token against a secret.
 * @param token - The token provided by the user
 * @param secret - The user's stored secret
 * @returns boolean indicating validity
 */
export async function verifyTwoFactorToken(token: string, secret: string): Promise<boolean> {
    const result = await verify({ token, secret });
    return (result as any).valid === true;
}
