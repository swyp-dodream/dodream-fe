import clsx from 'clsx';
import { useEffect, useReducer } from 'react';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import { TAG_LIMIT } from '@/constants/review.constant';
import { useGetProfile } from '@/hooks/profile/use-get-profile';
import useCreateReview from '@/hooks/review/use-create-review';
import useGetReviewMembers from '@/hooks/review/use-get-review-members';
import useToast from '@/hooks/use-toast';
import type { Reaction, ReviewState, ReviewTag } from '@/types/review.type';
import { reviewReducer } from '@/utils/review.util';
import ReviewDetailSelect from './review-detail-select';
import ReviewReactionButton from './review-reaction-button';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: bigint;
}

const initialState: ReviewState = {
  showIntro: true,
  userIndex: 0,
  step: 1,
  reviews: [],
};

/**
 * 리뷰 작성 모달
 */
export default function CreateReviewModal({
  isOpen,
  onClose,
  postId,
}: CreateReviewModalProps) {
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  const { data, isLoading } = useGetReviewMembers(BigInt(postId));
  const { data: profile } = useGetProfile();
  const { mutate: createReviews } = useCreateReview();
  const toast = useToast();

  const { showIntro, userIndex, step, reviews } = state;

  // 멤버 내역 로딩 완료되면 세팅
  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_MEMBERS', payload: data });
    }
  }, [data]);

  const members = data ?? [];
  const currentUser = members[userIndex];
  const currentReview =
    reviews.find((r) => r.userId === currentUser.userId) ?? reviews[userIndex];

  // 첫 번째, 마지막 페이지인지 여부
  const isFirst = userIndex === 0 && step === 1;
  const isLast = userIndex === members.length - 1 && step === 2;

  // 긍정/부정 리뷰 선택
  const handleSetReaction = (reaction: Reaction) =>
    dispatch({
      type: 'SET_REACTION',
      payload: { userId: currentUser.userId, reaction },
    });

  // 태그 설정
  const handleSetTags = (tags: ReviewTag[]) =>
    dispatch({
      type: 'SET_TAGS',
      payload: { userId: currentUser.userId, tags },
    });

  // 리뷰 제출
  const submitReview = async () => {
    createReviews(
      { reviews, postId },
      {
        onSuccess: () => {
          toast({
            title: '후기 작성이 완료되었습니다.',
          });
          onClose();
        },
        onError: () => {
          toast({
            title: '후기 작성에 실패했습니다. 잠시 후 다시 시도해주세요.',
          });
        },
      },
    );
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
                {profile?.nickname}님이 참여한 프로젝트가 종료되었습니다
              </p>
              <p className="body-lg-regular text-primary">
                팀원들에 대한 후기를 남겨주세요 모든 피드백은 익명으로 처리되며
                <br />
                향후 더 나은 협업 환경을 위해 활용돼요
              </p>
            </section>
            <footer className="flex justify-end">
              <Button
                variant="solid"
                disabled={isLoading}
                onClick={() => dispatch({ type: 'START_REVIEW' })}
              >
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
                    key={member.userId}
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
                  <ReviewReactionButton
                    variant="POSITIVE"
                    selected={currentReview?.reaction === 'POSITIVE'}
                    onClick={() => handleSetReaction('POSITIVE')}
                  />
                  <ReviewReactionButton
                    variant="NEGATIVE"
                    selected={currentReview?.reaction === 'NEGATIVE'}
                    onClick={() => handleSetReaction('NEGATIVE')}
                  />
                </div>
              </section>
            ) : (
              // 상세 후기 체크
              <section className="flex-1">
                <p className="body-md-medium mt-2 mb-4">
                  {currentUser.nickname}님의 상세 후기를 선택해 주세요
                </p>
                <ReviewDetailSelect
                  type={currentReview.reaction ?? 'POSITIVE'}
                  selectedTags={currentReview.tags}
                  onChange={handleSetTags}
                />
              </section>
            )}

            {/* 이전/다음 버튼 */}
            <footer
              className={clsx(
                'flex items-center border-t-1 border-border-primary pt-4',
                step === 2 ? 'justify-between' : 'justify-end',
              )}
            >
              {step === 2 && (
                <span className="body-md-medium">
                  {currentReview?.tags?.length ?? 0}/{TAG_LIMIT} 선택됨
                </span>
              )}
              <div className="flex gap-5">
                {!isFirst && (
                  <Button
                    variant="outline"
                    onClick={() => dispatch({ type: 'PREV' })}
                    className="h-10.5"
                  >
                    이전
                  </Button>
                )}
                {isLast ? (
                  <Button
                    variant="solid"
                    onClick={submitReview}
                    className="h-10.5"
                  >
                    완료
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    disabled={!currentReview?.reaction}
                    onClick={() => dispatch({ type: 'NEXT' })}
                    className="h-10.5"
                  >
                    다음
                  </Button>
                )}
              </div>
            </footer>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
}
