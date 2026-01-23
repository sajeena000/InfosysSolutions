import { db } from '../../utils/db';
import { teamMembers } from '../../database/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    // Select all members, ordered by newest first
    const members = await db.select().from(teamMembers).orderBy(desc(teamMembers.createdAt));
    return members;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team members',
    });
  }
});