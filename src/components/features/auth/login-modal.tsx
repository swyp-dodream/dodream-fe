import Image from 'next/image';
import Modal from '@/components/commons/modal';

const PROVIDER_CONFIG = {
  google: {
    logo: '/auth/google-logo.png',
    label: '구글 계정으로 계속하기',
    alt: '구글 로고',
  },
  naver: {
    logo: '/auth/naver-logo.png',
    label: '네이버 계정으로 계속하기',
    alt: '네이버 로고',
  },
} as const;

interface LoginModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModal) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col items-center gap-8">
        <Modal.Title>소셜 로그인</Modal.Title>
        <Modal.Description>구글 또는 네이버로 로그인하세요</Modal.Description>
        <Modal.Close />
        <div className="flex flex-col gap-3 items-center">
          <h3 className="heading-lg">나만의 AI 매칭 서비스 두드림</h3>
          <p className="body-lg-regular text-center">
            나에게 꼭맞는 AI 추천을 위해
            <br />
            간편하게 가입하고 로그인하세요
          </p>
        </div>
        {/* TODO: onClick 함수 수정 */}
        <div className="flex flex-col gap-5 w-full">
          <SocialLoginButton provider="google" onClick={() => {}} />
          <SocialLoginButton provider="naver" onClick={() => {}} />
        </div>
      </Modal.Content>
    </Modal>
  );
}

interface SocialLoginButtonProps {
  provider: 'google' | 'naver';
  onClick?: () => void;
}

/**
 * 소셜 로그인 버튼 컴포넌트
 */
function SocialLoginButton({ provider, onClick }: SocialLoginButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-2 bg-container-primary body-md-medium py-4 w-full items-center justify-center rounded-sm cursor-pointer"
    >
      <Image
        src={config.logo}
        alt={config.alt}
        width={14}
        height={14}
        aria-hidden="true"
      />
      {config.label}
    </button>
  );
}
