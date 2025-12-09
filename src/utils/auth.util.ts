import userApi from '@/apis/user.api';

/**
 * 로그아웃 함수
 * TODO: 리다이렉트 코드를 미들웨어로 이동
 */
export const logout = () => {
  // 비동기 API 호출은 백그라운드에서 실해
  userApi.logout().catch(console.error);
  window.location.href = '/';
};
