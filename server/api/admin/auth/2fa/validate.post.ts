import { db } from '../../../../utils/db';
import { admins } from '../../../../database/schema';
import { eq } from 'drizzle-orm';
import { verifyTwoFactorToken } from '../../../../utils/2fa';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { tempToken, token } = body;

    if (!tempToken || !token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Token and session identifier are required',
        });
    }
    
    const pendingId = getCookie(event, 'admin-2fa-pending');
    
    if (!pendingId || pendingId !== tempToken) {
         throw createError({
            statusCode: 401,
            statusMessage: 'Invalid or expired login session',
        });
    }

    const adminId = parseInt(pendingId);
    const [admin] = await db.select().from(admins).where(eq(admins.id, adminId)).limit(1);

    if (!admin || !admin.twoFactorEnabled || !admin.twoFactorSecret) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid 2FA session',
        });
    }

    const isValid = await verifyTwoFactorToken(token, admin.twoFactorSecret);

    if (!isValid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid authentication code',
        });
    }

    // 2FA Success: Set real session
    deleteCookie(event, 'admin-2fa-pending');
    
    setCookie(event, 'admin-session', String(admin.id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
    });

    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        isPrimary: admin.isPrimary,
        allowRegistration: admin.allowRegistration,
        twoFactorEnabled: admin.twoFactorEnabled
    };
});
