import SocialLoginButton from './social-login-button';

interface NaverLoginButtonProps {
  onModalClose: () => void;
}

export default function NaverLoginButton({
  onModalClose,
}: NaverLoginButtonProps) {
  // onClick 수정
  return <SocialLoginButton provider="naver" onClick={() => {}} />;
}
