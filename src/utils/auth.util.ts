import { clientApis } from '@/services/client.api';

/**
 * 로그아웃 함수
 */
export const logout = () => {
  // 비동기 API 호출은 백그라운드에서 실해
  clientApis.auth.logout().catch(console.error);
  window.location.href = '/';
};
