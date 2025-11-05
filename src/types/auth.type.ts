export type GoogleLoginResponseType = {
  accessToken: string;
};

// TODO: 실제 유저 타입으로 수정
export type UserType = {
  sub: string;
  email: string;
  name: string;
  picture: string;
};
