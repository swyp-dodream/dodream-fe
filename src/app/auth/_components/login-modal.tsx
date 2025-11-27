import Modal from '@/components/commons/modal';
import GoogleLoginButton from './buttons/google-login-button';

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
        <div className="flex flex-col gap-5 w-full">
          <GoogleLoginButton onModalClose={onClose} />
          {/* <NaverLoginButton onModalClose={onClose} /> */}
        </div>
      </Modal.Content>
    </Modal>
  );
}
