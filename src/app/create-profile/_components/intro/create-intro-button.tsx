import { overlay } from 'overlay-kit';
import CreateIntroModal from './create-intro-modal';

export default function CreateIntroButton() {
  return (
    <button
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <CreateIntroModal isOpen={isOpen} onClose={close} />
        ));
      }}
      className="border border-border-brand text-brand body-lg-medium h-[34px] w-[140px] rounded-md bg-surface py-2 ml-3 hover:bg-button-ai"
      type="button"
    >
      AI로 초안 작성
    </button>
  );
}
