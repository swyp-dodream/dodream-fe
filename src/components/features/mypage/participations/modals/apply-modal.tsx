'use client';

import { useState } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import TextField from '@/components/commons/text-fields/text-field';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';
import { ROLES } from '@/constants/role.constant';
import { useApply } from '@/hooks/post/use-apply';
import useToast from '@/hooks/use-toast';

interface ApplyModalProps {
  postId: bigint;
  applicationId: bigint;
  roles: string[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 지원 요청 모달
 * @param postId - 게시물 ID
 * @param roles - 현재 모집중인 직군 리스트 (예: ['프론트엔드', '백엔드'])
 */
export default function ApplyModal({
  postId,
  applicationId,
  roles,
  isOpen,
  onClose,
}: ApplyModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const toast = useToast();
  const { mutate: apply } = useApply(applicationId);

  // 모집중인 직군만 필터링
  const availableRoles = ROLES.filter((role) => roles.includes(role.name));

  const handleSubmit = () => {
    if (!selectedRole) return;

    apply(
      { postId, roleId: Number(selectedRole), message },
      {
        onSuccess: () => {
          toast({ title: '지원이 전송 완료되었습니다' });
          onClose();
        },
        onError: () => {
          toast({
            title: '지원 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content size="lg" className="flex flex-col gap-5">
        <header className="flex items-start justify-between">
          <Modal.Title>지원 취소</Modal.Title>
          <Modal.Close />
        </header>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="body-lg-medium text-primary">
              지원 직군 <span className="text-error">*</span>
            </h3>
            <RoleTabs
              value={selectedRole ?? undefined}
              onValueChange={setSelectedRole}
            >
              <RoleTabs.List>
                {availableRoles.map((role) => (
                  <RoleTabs.Trigger value={String(role.id)} key={role.name}>
                    {role.name}
                  </RoleTabs.Trigger>
                ))}
              </RoleTabs.List>
            </RoleTabs>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="body-lg-medium text-primary">지원 메시지</h3>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="지원 메시지를 작성해 보세요."
              maxLength={200}
              className="w-full"
              resizable={false}
            />
          </div>
        </section>

        <footer className="flex justify-end gap-5 border-t-1 border-border-primary pt-4">
          <Button
            variant="solid"
            size="xs"
            onClick={handleSubmit}
            disabled={!selectedRole}
          >
            전송
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}
