import { useEffect, useRef } from 'react';
import { logout } from '@/utils/auth.util';

export function useLogoutOnLeave() {
  const shouldLogoutRef = useRef(true);

  const preventLogout = () => {
    shouldLogoutRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (shouldLogoutRef.current) {
        logout();
      }
    };
  }, []);

  return { preventLogout };
}
