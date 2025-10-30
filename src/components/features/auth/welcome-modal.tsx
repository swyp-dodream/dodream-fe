import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col items-center gap-8">
        <Modal.Title>로그인 완료</Modal.Title>
        <Modal.Close />
        <div className="flex flex-col gap-3 items-center">
          <h3 className="heading-lg">회원가입이 완료됐어요!</h3>
          <p className="body-lg-regular text-center">
            꼭맞는 팀원 매칭을 위해
            <br />
            함께 할 스터디와 사이드 프로젝트를 두드려보세요
          </p>
        </div>
        <Button
          variant="brand"
          className="p-4 w-full rounded-sm"
          onClick={onClose}
        >
          둘러보기
        </Button>
      </Modal.Content>
    </Modal>
  );
}
