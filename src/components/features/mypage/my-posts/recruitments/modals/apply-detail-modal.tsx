import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import TextField from '@/components/commons/text-fields/text-field';
import useGetMyApplicationDetail from '@/hooks/my/use-get-my-application-detail';

interface ApplyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: bigint;
}

const INFO_LABEL_CLASS = 'text-primary body-lg-medium';

export default function ApplyDetailModal({
  isOpen,
  onClose,
  applicationId,
}: ApplyDetailModalProps) {
  const { data: myApplicationDetail } =
    useGetMyApplicationDetail(applicationId);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col gap-6">
        <header className="flex items-start justify-between">
          <Modal.Title>지원 상세</Modal.Title>
          <Modal.Close />
        </header>

        <section className="flex flex-col gap-8">
          <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <dt className={INFO_LABEL_CLASS}>지원 직군</dt>
              <dd>
                <span className="inline-flex rounded-full bg-chip-selected px-4 py-3 text-on-brand">
                  {myApplicationDetail?.roleName}
                </span>
              </dd>
            </div>

            <div className="flex flex-col gap-3">
              <dt className={INFO_LABEL_CLASS}>지원 메시지</dt>
              <dd>
                <TextField
                  value={myApplicationDetail?.message}
                  className="w-full"
                  readOnly
                  resizable={false}
                />
              </dd>
            </div>
          </dl>
        </section>

        <footer className="flex justify-end gap-5 border-t-1 border-border-primary pt-4">
          {/* TODO: 채팅페이지로 넘어가도록 구현 */}
          <Button variant="outline" size="xs">
            채팅하기
          </Button>
          <Button variant="solid" size="xs" onClick={onClose}>
            확인
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}
