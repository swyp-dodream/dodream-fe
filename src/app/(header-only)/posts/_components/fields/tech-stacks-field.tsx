'use client';

import { overlay } from 'overlay-kit';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import TechStackSelectModal from '@/app/(header-only)/create-profile/_components/tech-stack-modal/tech-stack-select-modal';
import TechStackTags from '@/app/(header-only)/create-profile/_components/tech-stack-modal/tech-stack-tags';
import FieldErrorMessage from '@/app/(header-only)/posts/_components/field-error-message';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import type { PostCreateFormData } from '@/schemas/post.schema';

const MAX_STACKS_PER_ROW = 5;

export default function TechStacksField() {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();

  const stackIds = watch('stackIds');

  useEffect(() => {
    register('stackIds');
  }, [register]);

  const removeStack = (stackId: number) => {
    setValue(
      'stackIds',
      stackIds.filter((id) => id !== stackId),
      { shouldDirty: true, shouldValidate: true },
    );
  };

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
                <TechStackSelectModal
                  isOpen={isOpen}
                  onClose={close}
                  initialStacks={stackIds}
                  onSave={(newStackIds) => {
                    setValue('stackIds', newStackIds, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  maxCount={10}
                />
              ));
            }}
            isError={!!errors.stackIds}
          >
            <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
          </DropdownButton>
        </div>

        {stackIds.length > 0 && (
          <div className="ml-auto mt-4 flex flex-col gap-4 items-end">
            {stackIds.length <= MAX_STACKS_PER_ROW ? (
              <TechStackTags
                variant="md"
                stacks={stackIds}
                removeStacks={removeStack}
              />
            ) : (
              <>
                <TechStackTags
                  variant="md"
                  stacks={stackIds.slice(0, MAX_STACKS_PER_ROW)}
                  removeStacks={removeStack}
                />
                <TechStackTags
                  variant="md"
                  stacks={stackIds.slice(MAX_STACKS_PER_ROW)}
                  removeStacks={removeStack}
                />
              </>
            )}
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
