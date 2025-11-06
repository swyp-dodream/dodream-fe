import clsx from 'clsx';

interface TextFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  resizable?: boolean;
  className?: string;
}

/**
 * 여러 줄 텍스트 필드
 * @param value - 텍스트 내용
 * @param maxLength - 텍스트 길이 제한 (전달할 경우 남은 글자수 노출)
 */
export default function TextField({
  value = '',
  maxLength,
  resizable = true,
  className,
  ...props
}: TextFieldProps) {
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="flex flex-col items-end gap-4">
      <textarea
        rows={6}
        value={value}
        maxLength={maxLength}
        className={clsx(
          'py-3 px-4 bg-surface border rounded-md placeholder:text-gray-400 body-lg-medium outline-none border-border-primary',
          resizable && 'resize-y',
          !resizable && 'resize-none',
          className,
        )}
        {...props}
      />
      {maxLength && (
        <p className="body-sm-regular text-secondary">
          {maxLength - currentLength >= 0 ? maxLength - currentLength : 0}자
          남음
        </p>
      )}
    </div>
  );
}
