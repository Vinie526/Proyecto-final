'use client';
import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => {
      setUser(data.user || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return { user, loading };
}
