import TrashIcon from '@/assets/icons/trash/24.svg';

interface PostDeleteButtonProps {
  postId: bigint;
}

export default function PostDeleteButton({ postId }: PostDeleteButtonProps) {
  return (
    <button type="button">
      <TrashIcon className="text-icon-light" />
    </button>
  );
}
