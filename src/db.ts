import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

export async function connect() {
  return mysql.createPool(process.env.DATABASE_URL as string);
}
