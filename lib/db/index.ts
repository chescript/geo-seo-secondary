import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Declare global pool for singleton pattern
declare global {
  var _pgPool: Pool | undefined;
}

// Create a connection pool with conservative settings for shared database
const pool = global._pgPool || new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 1, // Single connection for shared database
  min: 0,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 15000,
  allowExitOnIdle: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Store pool in global for singleton pattern (development only)
if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool;
}

// Create the drizzle database instance with schema
export const db = drizzle(pool, { schema });

// Export the pool for raw queries if needed
export { pool };

process.on('SIGINT', () => pool.end());
process.on('SIGTERM', () => pool.end());
