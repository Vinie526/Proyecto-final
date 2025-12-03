import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/Auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    console.log('Me token:', !!token);
    if (!token) return NextResponse.json({ user: null });
    const payload = verifyToken(token) as { email: string } | null;
    if (!payload) return NextResponse.json({ user: null });
    return NextResponse.json({ user: { email: payload.email } });
  } catch (err) {
    console.error('Me err:', err);
    return NextResponse.json({ user: null });
  }
}
