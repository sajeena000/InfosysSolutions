import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { teamMembers, activityLogs } from './schema';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

// Setup connection for the seed script
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data (optional, but good for testing)
  await db.delete(teamMembers);
  await db.delete(activityLogs);

  // 2. Insert Team Members (Using data from your appStore)
  await db.insert(teamMembers).values([
    {
      name: 'Tom Holland',
      role: 'Frontend Lead',
      email: 'tom@dashboard.com',
      online: true,
      tags: ['Vue', 'Design'],
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom Holland'
    },
    {
      name: 'Sajeena Malla',
      role: 'Backend Dev',
      email: 'sajeena@dashboard.com',
      online: false,
      tags: ['Node', 'SQL'],
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sajeena Malla'
    },
    {
      name: 'Chris Hemsworth',
      role: 'Product Designer',
      email: 'hemsworth@dashboard.com',
      online: true,
      tags: ['Figma', 'UX'],
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris Hemsworth'
    },
    {
      name: 'Nishant Malla',
      role: 'DevOps Engineer',
      email: 'nishant@dashboard.com',
      online: false,
      tags: ['AWS', 'CI/CD'],
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nishant Malla'
    },
    {
      name: 'Ryan Gosling',
      role: 'Intern',
      email: 'ryan@dashboard.com',
      online: true,
      tags: ['Learning'],
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan Gosling'
    }
  ]);

  // 3. Insert Initial Activity Logs
  await db.insert(activityLogs).values([
    { text: 'System initialized with database', type: 'info' },
    { text: 'Seed data injected successfully', type: 'success' }
  ]);

  console.log('✅ Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
