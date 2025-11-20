import Link from 'next/link';

interface RecruitmentButtonProps {
  postId: bigint;
}

export default function RecruitmentButton({ postId }: RecruitmentButtonProps) {
  return (
    <Link
      href={`/mypage/posts/${BigInt(postId)}/recruitment`}
      className="w-full rounded-md py-3 bg-button text-center body-lg-medium text-on-brand"
    >
      모집 내역
    </Link>
  );
}
