'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import FieldErrorMessage from '@/app/posts/_components/field-error-message';
import ActivityModeField from '@/app/posts/_components/fields/activity-mode-field';
import DeadlineField from '@/app/posts/_components/fields/deadline-field';
import DurationField from '@/app/posts/_components/fields/duration-field';
import InterestsField from '@/app/posts/_components/fields/interests-field';
import ProjectTypeField from '@/app/posts/_components/fields/project-type-field';
import RolesField from '@/app/posts/_components/fields/roles-field';
import TechStacksField from '@/app/posts/_components/fields/tech-stacks-field';
import TitleField from '@/app/posts/_components/fields/title-field';
import Button from '@/components/commons/buttons/button';
import Editor from '@/components/commons/editor';
import {
  type PostCreateFormData,
  postCreateFormSchema,
} from '@/schemas/post.schema';

export default function PostCreatePage() {
  const methods = useForm<PostCreateFormData>({
    resolver: zodResolver(postCreateFormSchema),
    defaultValues: {
      title: '',
      projectType: 'PROJECT',
      interestIds: [],
      roles: [],
      stackIds: [],
      content: '',
      activityMode: undefined,
      duration: undefined,
      deadlineAt: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // TODO: API 연결
  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <section className="w-[792px] flex flex-col gap-9">
      <header className="pb-7 border-b-1 border-border-primary">
        <h1 className="heading-xl text-primary">모집글</h1>
      </header>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-12" noValidate onSubmit={onSubmit}>
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

          <Button type="submit" variant="solid" size="md">
            게시
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
