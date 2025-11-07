import api from '@/apis/api';
import type { UserType } from '@/types/auth.type';

const authApi = {
  // TODO: getUser 함수 수정
  getUser: () => api.get<UserType>,
};

export default authApi;
