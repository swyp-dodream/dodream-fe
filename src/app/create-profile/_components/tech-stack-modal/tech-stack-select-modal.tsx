import { useState } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import useQueryParams from '@/hooks/filter/use-query-params';
import useProfileStore from '@/store/profile-store';
import type { TechStackType } from '@/types/profile.type';
import TechStackTabs from './tech-stack-tabs';
import TechStackTags from './tech-stack-tags';

interface TechStackSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFilter?: boolean;
}

/**
 * 기술 스택 선택 모달
 */
export default function TechStackSelectModal({
  isOpen,
  onClose,
  isFilter = false,
}: TechStackSelectModalProps) {
  const stacks = useProfileStore((state) => state.techStacks);
  const setStacks = useProfileStore((state) => state.setStacks);
  const { getArrayParam, setParams } = useQueryParams();

  const [draftStacks, setDraftStacks] = useState<TechStackType[]>(() => {
    // 필터링 모달이 아닌 경우
    if (!isFilter) return stacks;

    // 필터링 모달인 경우
    return getArrayParam('techs') as TechStackType[];
  });

  /**
   * 기술 스택 토글 함수
   * @param stack - 기술 스택
   */
  const toggleStacks = (stack: TechStackType) => {
    if (draftStacks.includes(stack)) {
      const newStacks = draftStacks.filter((element) => element !== stack);
      setDraftStacks(newStacks);

      if (isFilter) {
        setParams({ techs: newStacks.length > 0 ? newStacks : null });
      }
    } else {
      const newStacks = [...draftStacks, stack];
      setDraftStacks(newStacks);

      if (isFilter) {
        setParams({ techs: newStacks });
      }
    }
  };

  // 저장 버튼 클릭 시 실제 기술 스택 리스트 세팅
  const handleSave = () => {
    setStacks(draftStacks);
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
        <TechStackTabs draftStacks={draftStacks} toggleStacks={toggleStacks} />

        {/* 현재 선택된 태그 */}
        <div className="py-4 mr-auto">
          {draftStacks.length === 0 ? (
            <span className="text-subtle body-md-regular">
              선택된 태그가 없습니다.
            </span>
          ) : (
            <TechStackTags stacks={draftStacks} removeStacks={toggleStacks} />
          )}
        </div>

        {/* 저장 버튼 */}
        {!isFilter && (
          <footer className="w-full flex justify-between items-center pt-4 border-t border-border-primary">
            <span>{draftStacks.length}/5 선택됨</span>
            <Button variant="solid" size="xs" onClick={handleSave}>
              저장
            </Button>
          </footer>
        )}
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
