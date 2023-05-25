import { Pool, createPool, createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
import { Connection, PoolConnection } from 'mysql2';
config();

export async function connect(): Promise<Pool> {
  const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
    },
    // port: 3306,
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    // queueLimit: 0,
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0,
  });
  return connection;
}
