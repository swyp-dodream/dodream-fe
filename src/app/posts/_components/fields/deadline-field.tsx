'use client';

import { addDays, format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { PostCreateFormData } from '@/schemas/post.schema';

export default function DeadlineField() {
  const { register, watch, setValue } = useFormContext<PostCreateFormData>();
  const deadlineAt = watch('deadlineAt');
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: formRef, ...rest } = register('deadlineAt', {
    valueAsDate: true,
  });

  useEffect(() => {
    if (!deadlineAt) {
      const twoWeeksLater = addDays(new Date(), 14);
      setValue('deadlineAt', twoWeeksLater, { shouldDirty: false });
      if (inputRef.current) {
        inputRef.current.value = format(twoWeeksLater, 'yyyy-MM-dd');
      }
    }
  }, [deadlineAt, setValue]);

  return (
    <div className="flex items-center justify-between">
      <span className="body-lg-medium text-primary">모집 마감</span>

      <input
        ref={(el) => {
          formRef(el);
          inputRef.current = el;
        }}
        type="date"
        className="rounded-md px-4 py-3 bg-container-primary w-[180px] body-lg-medium text-primary"
        {...rest}
      />
    </div>
  );
}
