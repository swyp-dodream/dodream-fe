import clsx from 'clsx';
import { useState } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import { members } from '@/mocks/review';
import ReviewReactionButton from './buttons/review-reaction-button';
import ReviewDetailSelect from './review-detail-select';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 리뷰 작성 모달
 */
export default function CreateReviewModal({
  isOpen,
  onClose,
}: CreateReviewModalProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [userIndex, setUserIndex] = useState<number>(0); // 현재 리뷰중인 유저 인덱스
  const [step, setStep] = useState<1 | 2>(1); // 1페이지: 긍정/부정, 2페이지: 리뷰 상세

  const currentUser = members[userIndex];
  const isFirst = userIndex === 0 && step === 1;
  const isLast = userIndex === members.length - 1 && step === 2;

  // 다음 버튼 클릭
  const handleNextButtonClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setUserIndex((prev) => prev + 1);
      setStep(1);
    }
  };

  // 이전 버튼 클릭
  const handlePrevButtonClick = () => {
    if (step === 2) {
      setStep(1);
    } else {
      setUserIndex((prev) => prev - 1);
      setStep(2);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content
        className={clsx('flex flex-col py-5 px-7', {
          'h-90': !showIntro,
        })}
        size="lg"
      >
        <header className="flex items-start justify-between">
          <Modal.Title>후기 남기기</Modal.Title>
          <Modal.Close />
          <p
            aria-hidden="true"
            className="body-lg-medium w-full text-center mb-5"
          >
            후기 남기기
          </p>
        </header>

        {/* 첫 페이지 - 프로젝트 종료 안내 */}
        {showIntro ? (
          <>
            <section className="flex flex-col gap-3 pt-6 pb-9">
              <p className="heading-md text-primary">
                닉네임님이 참여한 프로젝트가 종료되었습니다
              </p>
              <p className="body-lg-regular text-primary">
                팀원들에 대한 후기를 남겨주세요 모든 피드백은 익명으로 처리되며
                <br />
                향후 더 나은 협업 환경을 위해 활용돼요
              </p>
            </section>
            <footer className="flex justify-end">
              <Button variant="solid" onClick={() => setShowIntro(false)}>
                다음
              </Button>
            </footer>
          </>
        ) : (
          // 이후 페이지 - 유저 후기 작성
          <div className="flex flex-col h-full">
            {/* 유저 탭 리스트 섹션 */}
            <section>
              <ul className="flex gap-4 pt-2 pb-3">
                {members.map((member, index) => (
                  <li
                    className={clsx(
                      'body-md-medium py-3 px-4 rounded-full',
                      index === userIndex
                        ? 'text-on-brand bg-chip-selected'
                        : 'text-primary bg-container-primary',
                    )}
                    key={member.id}
                  >
                    {member.nickname}
                  </li>
                ))}
              </ul>
            </section>

            {/* 리뷰 선택 섹션 */}
            {step === 1 ? (
              // 긍정/부정 평가
              <section className="flex-1">
                <p className="body-md-medium mt-2 mb-4 flex gap-1">
                  {currentUser.nickname}님과의 협업 경험은 어떠셨나요?
                  <span className="text-error">*</span>
                </p>
                <div className="flex justify-between gap-5">
                  <ReviewReactionButton variant="positive" />
                  <ReviewReactionButton variant="negative" />
                </div>
              </section>
            ) : (
              // 상세 후기 체크
              <section className="flex-1">
                <p className="body-md-medium mt-2 mb-4">
                  {currentUser.nickname}님의 상세 후기를 선택해 주세요
                </p>
                <ReviewDetailSelect selectedTags={[]} onChange={() => {}} />
              </section>
            )}

            {/* 이전/다음 버튼 */}
            <footer className="flex justify-end gap-5 border-t-1 border-border-primary pt-4">
              {!isFirst && (
                <Button
                  variant="outline"
                  className="h-10.5"
                  onClick={handlePrevButtonClick}
                >
                  이전
                </Button>
              )}
              {isLast ? (
                <Button variant="solid" className="h-10.5">
                  완료
                </Button>
              ) : (
                <Button
                  variant="solid"
                  className="h-10.5"
                  onClick={handleNextButtonClick}
                >
                  다음
                </Button>
              )}
            </footer>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
}
