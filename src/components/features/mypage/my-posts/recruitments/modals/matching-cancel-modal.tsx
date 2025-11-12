'use client';

import clsx from 'clsx';
import { useState } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import TextField from '@/components/commons/text-fields/text-field';
import useToast from '@/hooks/use-toast';

const CAUSE_LIST = [
  { id: '1', label: '다른 멤버와 함께 하기로 했어요' },
  { id: '2', label: '일정이 맞지 않았어요' },
  { id: '3', label: '기대하는 역할과 방향이 달랐어요' },
  { id: '4', label: '기타' },
];

interface MatchingCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

export default function MatchingCancelModal({
  isOpen,
  onClose,
  nickname,
}: MatchingCancelModalProps) {
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const toast = useToast();

  const handleCacelMatching = () => {
    onClose();
    toast({ title: '매칭이 취소되었습니다' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col gap-5" size="lg">
        <header className="flex items-start justify-between">
          <Modal.Title>매칭 취소</Modal.Title>
          <Modal.Close />
        </header>

        <section className="flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <h2 className="heading-md">
              {nickname}님과의 매칭을 취소하시겠어요?
            </h2>
            <p className="body-lg-regular">
              해당 모집글의 매칭 취소 가능 횟수가 두 번 남았어요
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="body-lg-medium">
              매칭 취소 사유 <span className="text-error">*</span>
            </h3>
            <div className="flex flex-col">
              {CAUSE_LIST.map(({ id, label }) => (
                <CheckBoxWithLabel
                  key={id}
                  name="cause"
                  id={id}
                  label={label}
                  checked={selectedCause === id}
                  onSelect={() => setSelectedCause(id)}
                />
              ))}
            </div>

            <TextField
              className="w-[530px]"
              resizable={false}
              placeholder="매칭 취소 사유를 작성해 주세요."
              onChange={() => {}}
              readOnly={selectedCause !== '4'}
            />
          </div>
        </section>

        <footer className="flex justify-end gap-5 border-t-1 border-border-primary pt-4">
          <Button variant="outline" size="xs" onClick={onClose}>
            돌아가기
          </Button>
          <Button
            variant="solid"
            size="xs"
            onClick={handleCacelMatching}
            disabled={!selectedCause}
          >
            매칭 취소
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}

interface CheckBoxWithLabelProps {
  name: string;
  id: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}

function CheckBoxWithLabel({
  name,
  id,
  label,
  checked,
  onSelect,
}: CheckBoxWithLabelProps) {
  return (
    <div className="px-3 py-2 flex items-center gap-4">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onSelect}
        className={clsx(
          'appearance-none border-1 border-icon-dark size-4 rounded-sm bg-no-repeat bg-center bg-size-[12px]',
          checked && 'bg-icon-dark',
        )}
        style={
          checked
            ? { backgroundImage: "url('/assets/icons/check/12.svg')" }
            : undefined
        }
      />

      <label htmlFor={id} className="body-lg-regular">
        {label}
      </label>
    </div>
  );
}
