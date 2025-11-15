'use client';

import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useToast from '@/hooks/use-toast';

interface ApplyCancelModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

export default function ApplyCancelModal({
  postId,
  isOpen,
  onClose,
  nickname,
}: ApplyCancelModalProps) {
  const toast = useToast();

  // TODO: 지원 취소 훅 호출

  const handleCancelApply = () => {
    toast({ title: '지원이 취소되었습니다' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content size="lg">
        <header className="flex items-start justify-between">
          <Modal.Title>지원 취소</Modal.Title>
          <Modal.Close />
        </header>

        <section className="flex flex-col gap-3 pt-6 pb-9">
          <span className="heading-md text-primary">
            {nickname}님에게 보낸 지원을 취소하시겠어요?
          </span>
          <span className="body-lg-regular">
            지원을 취소할 경우 해당 내역은 복구되지 않아요
          </span>
        </section>

        <footer className="flex justify-end gap-5">
          <Button variant="outline" size="xs" onClick={onClose}>
            돌아가기
          </Button>
          <Button variant="solid" size="xs" onClick={handleCancelApply}>
            지원 취소
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}
