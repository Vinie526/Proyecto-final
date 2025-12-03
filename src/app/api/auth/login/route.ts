import { NextRequest, NextResponse } from 'next/server';
import { openDB, verifyPassword } from '@/lib/Base de datos';
import { signToken } from '@/lib/Auth';

export async function POST(req: NextRequest) {
  console.log('Login hit');
  try {
    const { email, password } = await req.json();
    const isValid = await verifyPassword(email, password);
    if (!isValid) return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    const token = signToken(email);
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-token', token, { 
      httpOnly: true, 
      sameSite: 'strict', 
      maxAge: 86400, 
      secure: process.env.NODE_ENV === 'production' 
    });
    return response;
  } catch (err) {
    console.error('Login err:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
