import Button from '@/components/commons/buttons/button';
import useToast from '@/hooks/use-toast';

interface RecruitmentButtonProps {
  postId: bigint;
}

export default function RecruitmentButton({ postId }: RecruitmentButtonProps) {
  const toast = useToast();

  return (
    // <Link
    //   href={`/mypage/posts/${postId}/recruitment`}
    //   className="w-full rounded-md py-3 bg-button text-center body-lg-medium text-on-brand"
    // >
    //   모집 내역
    // </Link>
    <Button
      onClick={() => toast({ title: '준비중입니다.' })}
      variant="solid"
      className="w-full"
    >
      모집 내역
    </Button>
  );
}
