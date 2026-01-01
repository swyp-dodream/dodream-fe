import Link from 'next/link';
import EditIcon from '@/assets/icons/edit/24.svg';

interface PostEditButtonProps {
  postId: bigint;
}

export default function PostEditButton({ postId }: PostEditButtonProps) {
  return (
    <Link href={`/posts/edit/${BigInt(postId)}`}>
      <EditIcon className="text-icon-light" />
    </Link>
  );
}
