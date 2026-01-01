import XIcon from '@/assets/icons/x/14.svg';

interface DropdownOptionChipProps {
  text: string;
  onDelete: () => void;
}

export default function DropdownOptionChip({
  text,
  onDelete,
}: DropdownOptionChipProps) {
  return (
    <div className="w-[180px] rounded-md border border-border-primary px-4 py-3 flex justify-between items-center">
      <span className="body-lg-medium text-primary">{text}</span>
      <XIcon className="text-icon-light cursor-pointer" onClick={onDelete} />
    </div>
  );
}
