import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import CloseIcon from '@/assets/icons/x/14.svg';

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
      className={`fixed inset-0 z-50 bg-overlay ${className}`}
    />
  );
};

interface ModalContentProps {
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

Modal.Content = ({
  children,
  size = 'md',
  className = '',
}: ModalContentProps) => {
  return (
    <Dialog.Content
      className={clsx(
        'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-7 px-6 shadow-card rounded-md',
        {
          'w-modal-md': size === 'md',
          'w-modal-lg': size === 'lg',
          'w-modal-xl': size === 'xl',
        },
        className,
      )}
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
    <Dialog.Close
      onClick={() => onClick?.()}
      className={`absolute top-5 right-7 w-7 h-7 cursor-pointer  bg-container-primary rounded-full flex items-center justify-center ${className}`}
    >
      {children ?? <CloseIcon className="text-icon-dark" />}
    </Dialog.Close>
  );
};
