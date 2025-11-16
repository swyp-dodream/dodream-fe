'use client';

import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useCancelApply from '@/hooks/post/use-cancel-apply';
import useToast from '@/hooks/use-toast';

interface ApplyCancelModalProps {
  applicationId: bigint;
  postId: bigint;
  nickname: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 지원 취소 모달
 * @param applicationId - 지원 ID
 * @param postId - 모집글 ID
 * @param nickname - 모집글 작성자 닉네임
 */
export default function ApplyCancelModal({
  applicationId,
  postId,
  nickname,
  isOpen,
  onClose,
}: ApplyCancelModalProps) {
  const { mutate: cancelApply } = useCancelApply(postId);
  const toast = useToast();

  const handleCancelApply = () => {
    cancelApply(applicationId, {
      onSuccess: () => {
        toast({ title: '지원이 취소되었습니다' });
      },
      onError: () => {
        toast({
          title: '지원을 취소하지 못했습니다. 잠시 후 다시 시도해주세요.',
        });
      },
      onSettled: () => {
        onClose();
      },
    });
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
