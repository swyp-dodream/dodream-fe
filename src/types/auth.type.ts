export type UserType = {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  provider: ProviderType;
  lastLoginAt: string;
};

export type ProviderType = 'GOOGLE' | 'NAVER';
