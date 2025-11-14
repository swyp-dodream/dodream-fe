'use client';

import { overlay } from 'overlay-kit';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import FieldErrorMessage from '@/app/posts/_components/field-error-message';
import InterestSelectModal from '@/app/posts/_components/interests-modal/interest-select-modal';
import InterestTags from '@/app/posts/_components/interests-modal/interest-tags';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import type { PostCreateFormData } from '@/schemas/post.schema';
import usePostCreateStore from '@/store/post-create-store';

export default function InterestsField() {
  const {
    watch,
    register,
    setValue,
    getValues,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();
  const isMounted = useRef(false);
  const projectType = watch('projectType');
  const interests = usePostCreateStore((state) => state.interests);
  const removeInterests = usePostCreateStore((state) => state.removeInterests);

  useEffect(() => {
    register('interestIds');
  }, [register]);

  useEffect(() => {
    const prevIds = getValues('interestIds');
    const nextIds = interests.map((interest) => interest.id);
    const hasChanged =
      prevIds.length !== nextIds.length ||
      prevIds.some((id, index) => id !== nextIds[index]);

    if (!hasChanged) {
      return;
    }

    setValue('interestIds', nextIds, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [getValues, interests, setValue]);

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
                <InterestSelectModal isOpen={isOpen} onClose={close} />
              ));
            }}
            isError={!!errors.interestIds}
          >
            <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
          </DropdownButton>
        </div>

        {interests.length !== 0 && (
          <div className="ml-auto">
            <InterestTags
              variant="light"
              interests={interests}
              removeInterest={removeInterests}
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
