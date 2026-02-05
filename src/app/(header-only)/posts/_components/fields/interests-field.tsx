'use client';

import { overlay } from 'overlay-kit';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import InterestSelectModal from '@/app/(header-only)/create-profile/_components/interests-modal/interest-select-modal';
import InterestTags from '@/app/(header-only)/create-profile/_components/interests-modal/interest-tags';
import FieldErrorMessage from '@/app/(header-only)/posts/_components/field-error-message';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import type { PostCreateFormData } from '@/schemas/post.schema';

export default function InterestsField() {
  const {
    watch,
    register,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();

  const isMounted = useRef(false);
  const projectType = watch('projectType');
  const interestIds = watch('interestIds');

  useEffect(() => {
    register('interestIds');
  }, [register]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (projectType === 'STUDY') {
      clearErrors('interestIds');
      return;
    }
    void trigger('interestIds');
  }, [projectType, clearErrors, trigger]);

  const removeInterest = (interestId: number) => {
    setValue(
      'interestIds',
      interestIds.filter((id) => id !== interestId),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="body-lg-medium text-primary">관심 분야</span>
            {projectType === 'STUDY' && (
              <span className="body-lg-medium text-subtle">(선택)</span>
            )}
          </div>

          <DropdownButton
            label="관심 분야 선택"
            onClick={() => {
              overlay.open(({ isOpen, close }) => (
                <InterestSelectModal
                  isOpen={isOpen}
                  onClose={close}
                  initialInterests={interestIds}
                  onSave={(newInterestIds) => {
                    setValue('interestIds', newInterestIds, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  maxCount={2}
                  tagVariant="sm"
                />
              ));
            }}
            isError={!!errors.interestIds}
          >
            <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
          </DropdownButton>
        </div>

        {interestIds.length !== 0 && (
          <div className="ml-auto">
            <InterestTags
              variant="light"
              interests={interestIds}
              removeInterest={removeInterest}
              showIndex={false}
            />
          </div>
        )}
      </div>
      {errors.interestIds && (
        <FieldErrorMessage className="flex justify-end">
          {errors.interestIds.message}
        </FieldErrorMessage>
      )}
    </div>
  );
}
