import { db } from '../../../utils/db';
import { teamMembers } from '../../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const body = await readBody(event);

  try {
    const updated = await db.update(teamMembers)
      .set({
        name: body.name,
        role: body.role,
        email: body.email,
        bio: body.bio,
        jobTitle: body.jobTitle,
        linkedinUrl: body.linkedinUrl,
        imageUrl: body.imageUrl,
        isPublic: body.isPublic
      })
      .where(eq(teamMembers.id, id))
      .returning();
      
    return updated[0];
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update' });
  }
});