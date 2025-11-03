'use client';

import { type TokenResponse, useGoogleLogin } from '@react-oauth/google';
import authApi from '@/apis/auth.api';
import { tokenStorage } from '@/utils/auth.util';
import SocialLoginButton from './social-login-button';

interface GoogleLoginButtonProps {
  onModalClose: () => void;
}

export default function GoogleLoginButton({
  onModalClose,
}: GoogleLoginButtonProps) {
  // TODO: 임시 로그인 성공 콜백 함수 삭제
  const tempHandleSuccess = async (
    tokenResponse: Omit<
      TokenResponse,
      'error' | 'error_description' | 'error_uri'
    >,
  ) => {
    // 구글 Access Token 추출
    const accessToken = tokenResponse.access_token;
    tokenStorage.setToken(accessToken);

    onModalClose(); // 모달 닫기
  };

  /**
   * 로그인 성공 콜백 함수
   * @param codeResponse.code - 서버에 전달할 구글 인증 코드
   */
  const handleSuccess = async (codeResponse: { code: string }) => {
    try {
      const data = await authApi.googleLogin(codeResponse.code);
      // TODO: 로컬 스토리지 처리 함수 분리
      tokenStorage.setToken(data.accessToken);

      // TODO: 로그인 성공 메시지 있을 경우 추가
      onModalClose(); // 모달 닫기
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 로그인 실패 콜백함수
   */
  const handleError = () => {
    console.error('Google 로그인 실패');
  };

  // TODO: 임시 로그인 함수 삭제
  const tempLogin = useGoogleLogin({
    onSuccess: tempHandleSuccess,
    onError: handleError,
  });

  /**
   * 로그인 함수
   */
  const _login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return <SocialLoginButton provider="google" onClick={() => tempLogin()} />;
}
