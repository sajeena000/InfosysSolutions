import { getAuthenticatedAdmin } from '../../../../utils/session';
import { db } from '../../../../utils/db';
import { admins } from '../../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const admin = await getAuthenticatedAdmin(event);

    await db.update(admins)
        .set({
            twoFactorSecret: null,
            twoFactorEnabled: false
        })
        .where(eq(admins.id, admin.id));

    return { success: true };
});
