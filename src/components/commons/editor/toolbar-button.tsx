import clsx from 'clsx';

interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export default function ToolbarButton({
  children,
  onClick,
  isActive = false,
}: ToolbarButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        'p-2 rounded-sm hover:bg-container-primary-hover',
        isActive && 'bg-container-primary-selected',
      )}
    >
      {children}
    </button>
  );
}
