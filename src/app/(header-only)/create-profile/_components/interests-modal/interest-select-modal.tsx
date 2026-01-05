import { useState } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useQueryParams from '@/hooks/filter/use-query-params';
import useProfileStore from '@/store/profile-store';
import type { InterestsType } from '@/types/profile.type';
import InterestTabs from './interest-tabs';
import InterestTags from './interest-tags';

interface InterestSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFilter?: boolean;
}

/**
 * 관심분야 선택 모달
 */
export default function InterestSelectModal({
  isOpen,
  onClose,
  isFilter = false,
}: InterestSelectModalProps) {
  const interests = useProfileStore((state) => state.interests);
  const setInterests = useProfileStore((state) => state.setInterests);
  const { getArrayParam, setParams } = useQueryParams();

  const [draftInterests, setDraftInterests] = useState<InterestsType[]>(() => {
    // 필터링 모달이 아닌 경우
    if (!isFilter) return interests;

    // 필터링 모달인 경우
    return getArrayParam('interests') as InterestsType[];
  });

  /**
   * 관심 분야 토글 함수
   * @param interest - 관심 분야
   */
  const toggleInterests = (interest: InterestsType) => {
    if (draftInterests.includes(interest)) {
      const newInterests = draftInterests.filter(
        (element) => element !== interest,
      );
      setDraftInterests(newInterests);

      if (isFilter) {
        setParams({ interests: newInterests.length > 0 ? newInterests : null });
      }
    } else {
      const newInterests = [...draftInterests, interest];
      if (!isFilter && draftInterests.length >= 5) return;

      setDraftInterests(newInterests);

      if (isFilter) {
        setParams({
          interests: newInterests.map((interest) => interest),
        });
      }
    }
  };

  // 저장 버튼 클릭 시 실제 관심분야 리스트 세팅
  const handleSave = () => {
    setInterests(draftInterests);
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
        <InterestTabs
          draftInterests={draftInterests}
          toggleInterests={toggleInterests}
        />

        {/* 현재 선택된 태그 */}
        <div className="py-6 mr-auto">
          {draftInterests.length === 0 ? (
            <span className="text-subtle body-md-regular">
              {isFilter
                ? '선택된 태그가 없습니다'
                : '가장 관심 있는 분야부터 순서대로 최대 5개까지 선택해주세요.'}
            </span>
          ) : (
            <InterestTags
              interests={draftInterests}
              removeInterest={toggleInterests}
              variant={isFilter ? 'filter' : 'dark'}
            />
          )}
        </div>

        {/* 저장 버튼 */}
        {!isFilter && (
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
        )}
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
