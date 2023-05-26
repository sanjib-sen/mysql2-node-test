import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
config();

export async function connect() {
  return createPool(process.env.DATABASE_URL as string);
}
