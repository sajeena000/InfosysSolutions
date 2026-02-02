import { db } from '../../../utils/db';
import { teamMembers } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return { success: true };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to delete' });
  }
});