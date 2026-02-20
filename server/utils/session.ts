import { db } from './db';
import { admins } from '../database/schema';
import { eq } from 'drizzle-orm';
import { H3Event } from 'h3';

export async function getAuthenticatedAdmin(event: H3Event) {
    const sessionId = getCookie(event, 'admin-session');

    if (!sessionId) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Not authenticated',
        });
    }

    const [admin] = await db.select().from(admins).where(eq(admins.id, parseInt(sessionId))).limit(1);

    if (!admin) {
        deleteCookie(event, 'admin-session', { path: '/' });
        throw createError({
            statusCode: 401,
            statusMessage: 'Session invalid',
        });
    }

    return admin;
}
