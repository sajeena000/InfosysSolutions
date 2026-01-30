import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../database/schema'; 

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch in dev to prevent connection warnings
const client = postgres(connectionString); 

export const db = drizzle(client, { schema });