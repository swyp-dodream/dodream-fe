import api from '@/apis/api';
import type { GoogleLoginResponseType } from '@/types/auth.type';

const authApi = {
  // TODO: API URL 수정
  googleLogin: (code: string) =>
    api.post<GoogleLoginResponseType>('/auth/google', { code }),
};

export default authApi;
