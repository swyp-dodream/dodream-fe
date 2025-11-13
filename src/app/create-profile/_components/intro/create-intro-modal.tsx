import { useEffect } from 'react';
import Button from '@/components/commons/buttons/button';
import LoadingSpinner from '@/components/commons/loading-spinner';
import Modal from '@/components/commons/modal';
import useGenerateAiIntro from '@/hooks/user/use-generate-ai-intro';
import type { AiRequestDataType } from '@/types/profile.type';

interface CreateIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AiRequestDataType;
}

/**
 * AI 초안 생성 모달
 * @param data - AI 초안 요청을 위한 유저 프로필 정보 (AiRequestDataType 타입)
 * @returns
 */
export default function CreateIntroModal({
  isOpen,
  onClose,
  data,
}: CreateIntroModalProps) {
  const {
    mutate,
    data: newIntro,
    isPending,
    isError,
    reset,
  } = useGenerateAiIntro();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 무한 루프 방지 mutate, data 제거
  useEffect(() => {
    if (isOpen) {
      reset(); // 이전 상태 초기화
      mutate(data);
    }
  }, [isOpen]);

  // 초안 재생성
  const handleRegenerate = () => {
    reset();
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col items-center py-5 px-7" size="lg">
        <Modal.Title>AI 자기소개 초안 생성</Modal.Title>
        <Modal.Description>AI로 자기소개를 생성합니다</Modal.Description>
        <h4 className="body-lg-medium">AI 초안</h4>

        {/* 에러 발생할 경우 */}
        {isError && (
          <section
            className="flex flex-col w-full"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex flex-col my-[36px] gap-3">
              <p className="heading-md">AI 초안 작성에 실패했어요.</p>
              <p className="body-lg-regular">다시 시도해주세요.</p>
            </div>
            <footer className="flex gap-5 justify-end">
              <Button variant="outline">취소</Button>
              <Button variant="solid" onClick={handleRegenerate}>
                다시 작성
              </Button>
            </footer>
          </section>
        )}

        {/* 로딩중 UI */}
        {isPending && (
          <section
            className="h-[260px] flex flex-col items-center justify-center gap-[36px]"
            aria-live="polite"
            aria-busy="true"
          >
            <LoadingSpinner variant="lg" size={44} />
            <p className="body-lg-medium text-subtle">
              작성 완료까지 30초 정도 소요됩니다.
            </p>
          </section>
        )}

        {/* AI 자기소개 데이터 있을 경우 */}
        {newIntro && (
          <div className="flex flex-col">
            <p className="h-40 border border-border-primary py-4 px-7 rounded-md body-lg-medium overflow-y-auto my-6">
              {newIntro}
            </p>
            <hr className="text-border-primary" />
            <footer className="flex gap-5 justify-end mt-4">
              <Button variant="outline" onClick={handleRegenerate}>
                다시 작성
              </Button>
              <Button variant="solid">글 삽입</Button>
            </footer>
          </div>
        )}
        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
