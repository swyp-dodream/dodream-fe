import Button from '@/components/commons/buttons/button';
import LoadingSpinner from '@/components/commons/loading-spinner';
import Modal from '@/components/commons/modal';

interface CreateIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateIntroModal({
  isOpen,
  onClose,
}: CreateIntroModalProps) {
  const isLoading = true;
  const isError = false;
  const data =
    '안녕하세요, 직무 전문가 이름입니다. 간결한 한 줄 강점/경험을 통해 지원 분야에 기여하겠습니다. 첫째, 강점입니다. 관련 경험/성과를 통해 구체적 증명을 할 수 있었습니다. 구체적인 수치를 제시하여, 역량을 갖추었음을 증명했습니다. 둘째, 강점입니다. 관련 경험/성과를 통해 구체적 증명을 할 수 있었습니다. 구체적인 수치를 제시하여, 역량을 갖추었음을 증명했습니다. 셋째, 강점입니다. 관련 경험/성과를 통해 구체적 증명을 할 수 있었습니다. 구체적인 수치를 제시하여, 역량을 갖추었음을 증명했습니다.';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col items-center py-5 px-7" size="lg">
        <Modal.Title>AI 자기소개 초안 생성</Modal.Title>
        <Modal.Description>AI로 자기소개를 생성합니다</Modal.Description>
        <h4 className="body-lg-medium">AI 초안</h4>
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
              <Button variant="solid">다시 작성</Button>
            </footer>
          </section>
        )}
        {isLoading && (
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
        {!isLoading && !isError && data && (
          <div className="flex flex-col">
            <p className="h-40 border border-border-primary py-4 px-7 rounded-md body-lg-medium overflow-y-auto my-6">
              {data}
            </p>
            <hr className="text-border-primary" />
            <footer className="flex gap-5 justify-end mt-4">
              <Button variant="outline">다시 작성</Button>
              <Button variant="solid">글 삽입</Button>
            </footer>
          </div>
        )}

        <Modal.Close />
      </Modal.Content>
    </Modal>
  );
}
