'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyDetailModal from '@/components/features/mypage/my-posts/recruitments/modals/apply-detail-modal';

export default function ApplyDetailButton() {
  return (
    <Button
      variant="outline"
      size="xs"
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <ApplyDetailModal
            isOpen={isOpen}
            onClose={close}
            roleName="프론트엔드"
            message="열심히하겠습니다~~~~"
          />
        ));
      }}
    >
      지원 상세
    </Button>
  );
}
