import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import FieldErrorMessage from '@/app/(header-only)/posts/_components/field-error-message';
import {
  ActivityModeField,
  DeadlineField,
  DurationField,
  InterestsField,
  ProjectTypeField,
  RolesField,
  TechStacksField,
  TitleField,
} from '@/app/(header-only)/posts/_components/fields';
import Button from '@/components/commons/buttons/button';
import Editor from '@/components/commons/editor';
import {
  type PostCreateFormData,
  postCreateFormSchema,
} from '@/schemas/post.schema';

interface PostFormProps {
  defaultValues: Partial<PostCreateFormData>;
  onSubmit: (values: PostCreateFormData) => Promise<void> | void;
  submitLabel: string;
  isSubmitting?: boolean;
}

export default function PostForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
}: PostFormProps) {
  const methods = useForm<PostCreateFormData>({
    resolver: zodResolver(postCreateFormSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-12" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col gap-7">
          <label htmlFor="post-title" className="heading-lg text-primary">
            제목
          </label>
          <TitleField />
        </div>

        <div className="flex flex-col gap-9">
          <h2 className="heading-lg">모집 요약</h2>

          <div className="flex flex-col gap-8">
            <ProjectTypeField />

            <InterestsField />

            <RolesField />

            <TechStacksField />

            <ActivityModeField />

            <DurationField />

            <DeadlineField />
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <h2 className="heading-lg">모집 내용</h2>

          <Controller
            name="content"
            control={methods.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <Editor
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  isError={!!fieldState.error}
                />
                {fieldState.error && (
                  <FieldErrorMessage>
                    {fieldState.error.message}
                  </FieldErrorMessage>
                )}
              </div>
            )}
          />
        </div>

        <Button disabled={isSubmitting} type="submit" variant="solid" size="md">
          {isSubmitting ? '처리 중...' : submitLabel}
        </Button>
      </form>
    </FormProvider>
  );
}
