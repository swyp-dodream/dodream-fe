import api from '@/apis/api';
import type { GoogleLoginResponseType, UserType } from '@/types/auth.type';
import { tokenStorage } from '@/utils/auth.util';

const authApi = {
  // TODO: API URL 수정
  googleLogin: (code: string) =>
    api.post<GoogleLoginResponseType>('/auth/google', { code }),
  // TODO: getUser 함수 수정
  getUser: async (): Promise<UserType | undefined> => {
    const token = tokenStorage.getToken();

    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userInfo = await res.json();
      return userInfo;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authApi;
