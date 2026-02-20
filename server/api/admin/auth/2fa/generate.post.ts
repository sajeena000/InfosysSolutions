import { getAuthenticatedAdmin } from '../../../../utils/session';
import { generateTwoFactorSecret, generateTwoFactorQRCode } from '../../../../utils/2fa';

export default defineEventHandler(async (event) => {
    const admin = await getAuthenticatedAdmin(event);

    const { secret, otpauth } = generateTwoFactorSecret(admin.email);
    const qrCodeUrl = await generateTwoFactorQRCode(otpauth);

    return {
        secret,
        qrCodeUrl
    };
});
