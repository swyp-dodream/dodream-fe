import { useEffect } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useProfileStore from '@/store/profile-store';
import InterestTabs from './interest-tabs';
import InterestTags from './interest-tags';

interface InterestSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 관심분야 선택 모달
 */
export default function InterestSelectModal({
  isOpen,
  onClose,
}: InterestSelectModalProps) {
  const draftInterests = useProfileStore((state) => state.draftInterests);
  const setInterests = useProfileStore((state) => state.setInterests);
  const setDraftInterests = useProfileStore((state) => state.setDraftInterests);

  // 컴포넌트 마운트 시 임시 관심분야 리스트 세팅
  useEffect(() => {
    setDraftInterests();
  }, [setDraftInterests]);

  // 저장 버튼 클릭 시 실제 관심분야 리스트 세팅
  const handleSave = () => {
    setInterests();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content
        className="flex flex-col items-center py-5 px-7 h-[480px]"
        size="lg"
      >
        <Modal.Title>관심 분야 선택</Modal.Title>
        <Modal.Description>관심 분야를 선택하세요</Modal.Description>
        <header>
          <h3 className="body-lg-medium pb-5">관심 분야</h3>
        </header>

        {/* 관심 분야 선택 탭 */}
        <InterestTabs />

        {/* 현재 선택된 태그 */}
        <div className="py-6 mr-auto">
          {draftInterests.length === 0 ? (
            <span className="text-subtle body-md-regular">
              가장 관심 있는 분야부터 순서대로 최대 5개까지 선택해주세요.
            </span>
          ) : (
            <InterestTags />
          )}
        </div>

        {/* 저장 버튼 */}
        <footer className="w-full flex justify-between items-center pt-4 border-t border-border-primary">
          <span>{draftInterests.length}/5 선택됨</span>
          {/* 아무것도 선택하지 않았을 경우 버튼 비활성화 */}
          <Button
            variant="solid"
            size="xs"
            onClick={handleSave}
            disabled={draftInterests.length === 0}
          >
            저장
          </Button>
        </footer>
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
