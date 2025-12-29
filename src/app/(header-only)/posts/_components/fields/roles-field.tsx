'use client';

import clsx from 'clsx';
import { DropdownMenu } from 'radix-ui';
import { useFieldArray, useFormContext } from 'react-hook-form';
import DropdownOptionChip from '@/app/(header-only)/posts/_components/dropdown-option-chip';
import FieldErrorMessage from '@/app/(header-only)/posts/_components/field-error-message';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import Stepper from '@/components/commons/inputs/stepper';
import { ROLES } from '@/constants/role.constant';
import type { PostCreateFormData } from '@/schemas/post.schema';
import type { Role } from '@/types/role.type';

const ROLE_NAME_BY_ID = ROLES.reduce<Record<number, Role['name']>>(
  (acc, role) => {
    acc[role.id] = role.name;
    return acc;
  },
  {} as Record<number, Role['name']>,
);

export default function RolesField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();
  const { fields, append, remove, update } = useFieldArray<
    PostCreateFormData,
    'roles'
  >({
    name: 'roles',
    control,
  });

  const selectedRoleIds = fields.map((field) => field.roleId);
  const sortedFields = fields
    .map((field, index) => ({ field, index }))
    .sort((a, b) => a.field.roleId - b.field.roleId);

  const handleSelect = (role: Role) => {
    if (selectedRoleIds.includes(role.id)) return;
    append({ roleId: role.id, count: 1 });
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="body-lg-medium text-primary">모집 직군</span>
          </div>

          <RolesDropdown
            roles={ROLES}
            selectedRoleIds={selectedRoleIds}
            onSelect={handleSelect}
            isError={!!errors.roles?.message}
          />
        </div>

        {sortedFields.map(({ field, index }) => (
          <div key={field.id} className="flex gap-7 justify-end items-center">
            <DropdownOptionChip
              text={ROLE_NAME_BY_ID[field.roleId] ?? ''}
              onDelete={() => handleDelete(index)}
            />

            <Stepper
              step={field.count}
              onMinus={() =>
                update(index, { ...field, count: field.count - 1 })
              }
              onPlus={() => update(index, { ...field, count: field.count + 1 })}
            />
          </div>
        ))}
      </div>
      {errors && (
        <FieldErrorMessage className="flex justify-end">
          {errors.roles?.message}
        </FieldErrorMessage>
      )}
    </div>
  );
}

interface RolesDropdownProps {
  roles: ReadonlyArray<Role>;
  selectedRoleIds: ReadonlyArray<number>;
  onSelect: (role: Role) => void;
  isError?: boolean;
}

function RolesDropdown({
  roles,
  selectedRoleIds,
  onSelect,
  isError,
}: RolesDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownButton label="모집 직군 선택" isError={isError}>
          <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
        </DropdownButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            'bg-surface rounded-md shadow-card p-3 w-[180px] space-y-2 body-md-medium',
          )}
        >
          {roles.map((role) => {
            const disabled = selectedRoleIds.includes(role.id);

            return (
              <DropdownMenu.Item
                key={role.id}
                disabled={disabled}
                onSelect={() => onSelect(role)}
                className={clsx(
                  'px-2 py-2 rounded outline-none transition',
                  disabled
                    ? ' bg-container-secondary-selected'
                    : 'cursor-pointer hover:bg-primary',
                )}
              >
                {role.name}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
