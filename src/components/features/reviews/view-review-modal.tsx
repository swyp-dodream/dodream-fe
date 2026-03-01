import ThumbsDownIcon from '@/assets/icons/thumbs-down/14.svg';
import ThumbsUpIcon from '@/assets/icons/thumbs-up/14.svg';
import Button from '@/components/commons/buttons/button';
import Modal from '@/components/commons/modal';
import { REVIEW_ICONS, REVIEW_TAG_LABEL } from '@/constants/review.constant';
import { useGetProfile } from '@/hooks/profile/use-get-profile';
import { reviews } from '@/mocks/review.mock';
import { getReviewSummary } from '@/utils/review.util';

interface ViewReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** 리뷰 확인 모달 */
export default function ViewReviewModal({
  isOpen,
  onClose,
}: ViewReviewModalProps) {
  const { data: profile } = useGetProfile();
  const { positiveCount, negativeCount, dominantType, result } =
    getReviewSummary(reviews);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="flex flex-col py-5 px-7" size="lg">
        <header className="flex items-start justify-between">
          <Modal.Title>후기 확인</Modal.Title>
          <Modal.Close />
          <p
            aria-hidden="true"
            className="body-lg-medium w-full text-center mb-5"
          >
            후기 확인
          </p>
        </header>

        {/* 리뷰 요약 */}
        <section className="flex flex-col gap-2 mb-9">
          <p>{profile?.nickname}님의 협업 점수는?</p>
          <div className="flex items-center gap-2">
            {dominantType === 'positive' ? (
              <>
                <ThumbsUpIcon />
                <p className="body-lg-medium">
                  {reviews.length}명 중 {positiveCount}명이 {profile?.nickname}
                  님과의 함께한 경험이 좋았다고 말했어요
                </p>
              </>
            ) : (
              <>
                <ThumbsDownIcon />
                <p className="body-lg-medium">
                  {reviews.length}명 중 {negativeCount}명이 {profile?.nickname}
                  님과의 함께한 경험이 좋았다고 말했어요
                </p>
              </>
            )}
          </div>
        </section>

        {/* 받은 상세 후기 */}
        <section className="flex flex-col gap-4 mb-5">
          <p className="body-md-medium">
            {profile?.nickname}님이 받은 상세 후기예요
          </p>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-5">
            {result.map((tag) => {
              const Icon = REVIEW_ICONS[tag.tag];

              return (
                <li
                  key={tag.tag}
                  className="flex items-center bg-primary py-4 px-5 rounded-md justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="text-primary" />
                    <span className="body-md-regular">
                      {REVIEW_TAG_LABEL[tag.tag]}
                    </span>
                  </div>
                  {tag.count}
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="flex justify-end gap-5 border-t-1 border-border-primary pt-4">
          <Button variant="solid" onClick={onClose}>
            확인
          </Button>
        </footer>
      </Modal.Content>
    </Modal>
  );
}
