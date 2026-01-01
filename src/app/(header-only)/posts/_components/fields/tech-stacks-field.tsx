'use client';

import { overlay } from 'overlay-kit';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldErrorMessage from '@/app/(header-only)/posts/_components/field-error-message';
import TechStackSelectModal from '@/app/(header-only)/posts/_components/tech-stack-modal/tech-stack-select-modal';
import TechStackTags from '@/app/(header-only)/posts/_components/tech-stack-modal/tech-stack-tags';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import type { PostCreateFormData } from '@/schemas/post.schema';
import usePostCreateStore from '@/store/post-create-store';

export default function TechStacksField() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();
  const techStacks = usePostCreateStore((state) => state.techStacks);
  const removeStacks = usePostCreateStore((state) => state.removeStacks);

  useEffect(() => {
    register('stackIds');
  }, [register]);

  useEffect(() => {
    const prevIds = getValues('stackIds');
    const nextIds = techStacks.map((techStack) => techStack.id);
    const hasChanged =
      prevIds.length !== nextIds.length ||
      prevIds.some((id, index) => id !== nextIds[index]);

    if (!hasChanged) {
      return;
    }

    setValue('stackIds', nextIds, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [getValues, setValue, techStacks]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="body-lg-medium text-primary">기술 스택</span>
          </div>

          <DropdownButton
            label="기술 스택 선택"
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <TechStackSelectModal isOpen={isOpen} onClose={close} />
              ));
            }}
            isError={!!errors.stackIds}
          >
            <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
          </DropdownButton>
        </div>

        {techStacks.length > 0 && (
          <div className="ml-auto mt-4">
            <TechStackTags
              variant="md"
              stacks={techStacks}
              removeStacks={removeStacks}
            />
          </div>
        )}
      </div>
      {errors.stackIds && (
        <FieldErrorMessage className="flex justify-end">
          {errors.stackIds?.message}
        </FieldErrorMessage>
      )}
    </div>
  );
}
