import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onExit?: () => void;
}

/**
 * Dialog를 기반으로 한 Modal 컴포넌트
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={close}>
 *    <Modal.Overlay />
 *    <Modal.Content>
 *        <Modal.Title>제목</Modal.Title>
 *        <Modal.Description>설명</Modal.Description>
 *            <모달 내용 />
 *        <Modal.Close />
 *    </Modal.Content>
 * </Modal>
 * ```
 */
export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>{children}</Dialog.Portal>
    </Dialog.Root>
  );
}

Modal.Title = ({ children }: { children: React.ReactNode }) => {
  return <Dialog.Title className="sr-only">{children}</Dialog.Title>;
};

Modal.Description = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Description className="sr-only">{children}</Dialog.Description>
  );
};

Modal.Overlay = ({
  onClick,
  className = '',
}: {
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Dialog.Overlay
      onClick={() => onClick?.()}
      className={`fixed inset-0 z-50 ${className}`}
    />
  );
};

Modal.Content = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Dialog.Content
      className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white ${className}`}
    >
      {children}
    </Dialog.Content>
  );
};

Modal.Close = ({
  children,
  onClick,
  className = '',
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Dialog.Close onClick={() => onClick?.()} className={className}>
      {children ?? 'x'}
    </Dialog.Close>
  );
};
