// components/ProtectedRoute.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
      router.replace('/'); // redirect to login (homepage)
    }
  }, []);

  return children;
}
