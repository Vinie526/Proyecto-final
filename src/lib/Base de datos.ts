import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(process.cwd(), 'admin_data.db');  // ← Absoluto root

let cachedDb: any = null;  // Singleton

async function getDB() {
  if (cachedDb) return cachedDb;
  cachedDb = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
  
  // Schema init safe
  await cachedDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    PRAGMA table_info(users);  -- Verify
  `);
  
  console.log('DB ready, path:', DB_PATH);
  return cachedDb;
}

export async function openDB() {
  return getDB();
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(email: string, password: string): Promise<boolean> {
  const db = await getDB();
  try {
    const row = await db.get('SELECT password_hash FROM users WHERE email = ?', [email]);
    if (!row) return false;
    return bcrypt.compare(password, row.password_hash);
  } finally {
    // No close singleton
  }
}
