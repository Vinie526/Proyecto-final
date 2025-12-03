import jwt from 'jsonwebtoken';

export function signToken(email: string): string {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { email: string } | null {
  if (!process.env.JWT_SECRET) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as { email: string };
  } catch {
    return null;
  }
}
