import { useState, useEffect } from 'react';

type UserRole = 'user' | 'organizer' | 'admin';

export function useAuth() {
  const [role, setRole] = useState<UserRole>('user');

  // Simulating role change for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setRole(prevRole => {
        switch (prevRole) {
          case 'user': return 'organizer';
          case 'organizer': return 'admin';
          case 'admin': return 'user';
        }
      });
    }, 10000); // Change role every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    user: { role },
    isAuthorized: (allowedRoles: UserRole[]) => allowedRoles.includes(role)
  };
}