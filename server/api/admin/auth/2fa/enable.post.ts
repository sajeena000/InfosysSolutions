import { getAuthenticatedAdmin } from '../../../../utils/session';
import { verifyTwoFactorToken } from '../../../../utils/2fa';
import { db } from '../../../../utils/db';
import { admins } from '../../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const admin = await getAuthenticatedAdmin(event);
    const body = await readBody(event);
    const { token, secret } = body;

    if (!token || !secret) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Token and secret are required',
        });
    }

    const isValid = await verifyTwoFactorToken(token, secret);

    if (!isValid) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid authentication code',
        });
    }

    await db.update(admins)
        .set({
            twoFactorSecret: secret,
            twoFactorEnabled: true
        })
        .where(eq(admins.id, admin.id));

    return { success: true };
});
