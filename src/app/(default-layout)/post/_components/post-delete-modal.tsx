'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useDeletePost from '@/hooks/post/use-delete-post';
import useToast from '@/hooks/use-toast';

interface PostDeleteModalProps {
  postId: bigint;
  isOpen: boolean;
  onClose: () => void;
}

export default function PostDeleteModal({
  postId,
  isOpen,
  onClose,
}: PostDeleteModalProps) {
  const router = useRouter();
  const toast = useToast();
  const { mutateAsync: deletePost, isPending } = useDeletePost(BigInt(postId));

  const handleDeletePost = async () => {
    try {
      await deletePost();
      onClose();
      router.replace('/');
      toast({ title: '삭제를 완료했습니다' });
    } catch (_error) {
      toast({
        title: '삭제를 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content size="lg">
        <header className="flex items-start justify-between">
          <Modal.Title>모집글 삭제</Modal.Title>
          <Modal.Close />
        </header>

        <section className="flex flex-col gap-3 pt-6 pb-9">
          <p className="heading-md text-primary">
            정말 이 모집글을 삭제하시겠어요?
          </p>
          <p className="body-lg-regular text-primary">
            삭제하시면 AI 추천 내역 및 지원자 목록 등 모든 데이터가 삭제되며
            다시 복구할 수 없습니다
          </p>
        </section>

        <footer className="flex justify-end gap-5">
          <Button
            variant="outline"
            size="xs"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="solid"
            size="xs"
            onClick={handleDeletePost}
            disabled={isPending}
          >
            삭제
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}
