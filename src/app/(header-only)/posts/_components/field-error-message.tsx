import clsx from 'clsx';

interface FieldErrorMessageProps {
  className?: string;
  children: React.ReactNode;
}

export default function FieldErrorMessage({
  className,
  children,
}: FieldErrorMessageProps) {
  return (
    <p className={clsx('body-sm-medium text-error', className)}>{children}</p>
  );
}
