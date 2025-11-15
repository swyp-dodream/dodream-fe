import { overlay } from 'overlay-kit';
import DeleteAccountModal from '@/app/mypage/settings/_components/delete-account-modal';

export default function DeleteAccountButton() {
  const handleOpenDeleteAccountModal = () => {
    overlay.open(({ isOpen, close }) => (
      <DeleteAccountModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <button type="button" onClick={handleOpenDeleteAccountModal}>
      계정 삭제
    </button>
  );
}
