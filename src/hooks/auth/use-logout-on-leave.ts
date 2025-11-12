import { useEffect, useRef } from 'react';
import { logout } from '@/utils/auth.util';

/**
 * 페이지를 나가면 로그아웃 처리하는 훅
 */
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
