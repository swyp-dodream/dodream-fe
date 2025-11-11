import { useEffect } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useProfileStore from '@/store/profile-store';
import TechStackTabs from './tech-stack-tabs';
import TechStackTags from './tech-stack-tags';

interface TechStackSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 기술 스택 선택 모달
 */
export default function TechStackSelectModal({
  isOpen,
  onClose,
}: TechStackSelectModalProps) {
  const draftStacks = useProfileStore((state) => state.draftStacks);
  const setStacks = useProfileStore((state) => state.setStacks);
  const setDraftStacks = useProfileStore((state) => state.setDraftStacks);

  // 컴포넌트 마운트 시 임시 기술 스택 리스트 세팅
  useEffect(() => {
    setDraftStacks();
  }, [setDraftStacks]);

  // 저장 버튼 클릭 시 실제 기술 스택 리스트 세팅
  const handleSave = () => {
    setStacks();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content
        className="flex flex-col items-center py-5 px-7 h-[480px]"
        size="lg"
      >
        <Modal.Title>기술 스택 선택</Modal.Title>
        <Modal.Description>기술 스택을 선택하세요</Modal.Description>
        <header>
          <h3 className="body-lg-medium pb-5">기술 스택</h3>
        </header>

        {/* 기술 스택 선택 탭 */}
        <TechStackTabs />

        {/* 현재 선택된 태그 */}
        <div className="py-4 mr-auto">
          {draftStacks.length === 0 ? (
            <span className="text-subtle body-md-regular">
              선택된 태그가 없습니다.
            </span>
          ) : (
            <TechStackTags />
          )}
        </div>

        {/* 저장 버튼 */}
        <footer className="w-full flex justify-between items-center pt-4 border-t border-border-primary">
          <span>{draftStacks.length}/5 선택됨</span>
          <Button variant="solid" size="xs" onClick={handleSave}>
            저장
          </Button>
        </footer>
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
