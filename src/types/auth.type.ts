/** 유저 데이터 타입 */
export type UserType = {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  // provider: ProviderType;
  lastLoginAt: string;
};

export type ProviderType = 'google' | 'naver';
