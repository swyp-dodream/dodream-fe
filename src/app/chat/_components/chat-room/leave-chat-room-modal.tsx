import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useLeaveChatRoom from '@/hooks/chat/use-leave-chat-room';
import useToast from '@/hooks/use-toast';

interface LeaveChatRoomModalProps {
  oppositeName?: string;
  roomId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaveChatRoomModal({
  oppositeName,
  roomId,
  isOpen,
  onClose,
}: LeaveChatRoomModalProps) {
  const toast = useToast();
  const { mutate: leaveChatRoom } = useLeaveChatRoom({
    onSuccess: () => {
      toast({ title: '채팅방을 나왔습니다' });
      onClose();
    },
    onError: () => {
      toast({
        title: '채팅방에서 나오지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content size="lg" className="flex flex-col">
        <header>
          <Modal.Title>나가기</Modal.Title>
          <Modal.Description>선택한 채팅 나가기</Modal.Description>
          <Modal.Close />
        </header>

        <section className="flex flex-col gap-3 pt-6 pb-9">
          <p className="heading-md text-primary">
            {oppositeName}님과의 채팅방에서 나가시겠어요?
          </p>
          <p className="body-lg-regular text-primary">
            모든 대화 내역이 영구적으로 삭제되며 다시 복구할 수 없습니다.
          </p>
        </section>

        <footer className="flex justify-end gap-5">
          <Button variant="outline" size="xs" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="solid"
            size="xs"
            onClick={() => leaveChatRoom(roomId as string)}
          >
            나가기
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}
