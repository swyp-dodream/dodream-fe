export interface GoogleLoginResponseType {
  accessToken: string;
}

// TODO: 실제 유저 타입으로 수정
export interface UserType {
  email: string;
  name: string;
  picture: string;
}
