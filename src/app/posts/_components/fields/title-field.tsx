import { Controller, useFormContext } from 'react-hook-form';
import FieldErrorMessage from '@/app/posts/_components/field-error-message';
import Input from '@/components/commons/text-fields/input';

export default function TitleField() {
  const { control } = useFormContext();

  return (
    <Controller
      name="title"
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Input
            id="title"
            placeholder="글 제목을 입력해 주세요."
            isError={!!fieldState.error}
            {...field}
          />
          {fieldState.error && (
            <FieldErrorMessage>{fieldState.error.message}</FieldErrorMessage>
          )}
        </div>
      )}
    />
  );
}
