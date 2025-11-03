'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/commons/buttons/button';

interface RecruitmentButtonProps {
  postId: string;
}

export default function RecruitmentButton({ postId }: RecruitmentButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mypage/posts/${postId}/recruitment`);
  };

  return (
    <Button variant="solid" size="lg" onClick={handleClick}>
      모집 내역
    </Button>
  );
}
