import { pgTable, serial, text, boolean, timestamp, json } from 'drizzle-orm/pg-core';

// Table 1: Team Members
export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(),
  // We store tags as a JSON array since it's a list of strings
  tags: json('tags').$type<string[]>().default([]),
  online: boolean('online').default(false),
  avatarUrl: text('avatar_url'), // For the Dicebear URL
  createdAt: timestamp('created_at').defaultNow(),
});

// Table 2: Activity Logs
// This relates to the "Recent Activity" section of your dashboard
export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  type: text('type', { enum: ['info', 'success', 'warning', 'error'] }).default('info'),
  timestamp: timestamp('timestamp').defaultNow(),
});