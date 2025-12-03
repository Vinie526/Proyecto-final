import { NextRequest, NextResponse } from 'next/server';
import { openDB, hashPassword } from '@/lib/Base de datos';  // ← Estático

export async function POST(req: NextRequest) {
  console.log('Register hit');  // Debug
  try {
    const { email, password } = await req.json();
    const hash = await hashPassword(password);  // ← Solo password
    const db = await openDB();
    await db.run('INSERT OR IGNORE INTO users (email, password_hash) VALUES (?, ?)', [email, hash]);
    await db.close();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Registro falló' }, { status: 400 });
  }
}
