import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import MatchingCancelModal from '@/components/features/mypage/my-posts/recruitments/modals/matching-cancel-modal';

export default function MathcingCancelButton() {
  return (
    <Button
      variant="outline"
      size="xs"
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <MatchingCancelModal
            isOpen={isOpen}
            onClose={close}
            nickname="닉네임"
          />
        ));
      }}
    >
      매칭 취소
    </Button>
  );
}
