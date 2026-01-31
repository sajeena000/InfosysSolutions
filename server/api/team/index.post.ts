import { db } from '../../utils/db';
import { teamMembers } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  try {
    const newMember = await db.insert(teamMembers).values({
      name: body.name,
      email: body.email,
      role: body.role,
      tags: ['New'],
      online: false,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.name}`,
      // New public profile fields
      bio: body.bio || null,
      jobTitle: body.jobTitle || null,
      linkedinUrl: body.linkedinUrl || null,
      imageUrl: body.imageUrl || null,
      isPublic: body.isPublic || false
    }).returning();

    return newMember[0];
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add member (Email might be duplicate)',
    });
  }
});