import MinusIcon from '@/assets/icons/minus/16.svg';
import PlusIcon from '@/assets/icons/plus/16.svg';

interface StepperProps {
  step: number;
  onMinus: () => void;
  onPlus: () => void;
}

export default function Stepper({ step, onMinus, onPlus }: StepperProps) {
  return (
    <div className="w-[180px] flex justify-between items-center">
      <button
        type="button"
        onClick={onMinus}
        className="size-[42px] rounded-md border border-border-primary flex justify-center items-center disabled:text-icon-disable"
        disabled={step <= 1}
      >
        <MinusIcon />
      </button>
      <span className="body-lg-medium text-primary">{`${step}명`}</span>
      <button
        type="button"
        onClick={onPlus}
        className="size-[42px] rounded-md border border-border-primary flex justify-center items-center disabled:text-icon-disable"
        disabled={step >= 3}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
