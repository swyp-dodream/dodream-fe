import api from '@/apis/api';
import type { UserType } from '@/types/auth.type';
import { tokenStorage } from '@/utils/auth.util';

const authApi = {
  getUser: () => {
    const token = tokenStorage.getToken();
    return api.get<UserType>('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // TODO: 토큰 만료 시 에러처리 하지 않고 기존 토큰 삭제 및 토큰 재발급 시도
  },
  getProfile: () => {
    const token = tokenStorage.getToken();
    return api.get<UserType>('/api/profiles/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // TODO: 유저가 없는 경우에는 에러처리 하지 않고 null 반환
  },
};

export default authApi;
