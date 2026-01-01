'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@/app/(header-only)/posts/_components/post-form';
import useCreatePost from '@/hooks/post/use-create-post';
import useToast from '@/hooks/use-toast';
import usePostCreateStore from '@/store/post-create-store';

export default function PostCreatePage() {
  const toast = useToast();
  const router = useRouter();
  const { mutateAsync: createPost, isPending } = useCreatePost();
  const resetForm = usePostCreateStore((state) => state.reset);

  return (
    <section className="w-[792px] flex flex-col gap-9">
      <header className="pb-7 border-b-1 border-border-primary">
        <h1 className="heading-xl text-primary">모집글</h1>
      </header>

      <PostForm
        defaultValues={{
          title: '',
          projectType: 'PROJECT',
          interestIds: [],
          roles: [],
          stackIds: [],
          content: '',
          activityMode: undefined,
          duration: undefined,
          deadlineAt: undefined,
        }}
        submitLabel="게시"
        isSubmitting={isPending}
        onSubmit={async (values) => {
          try {
            const createdPost = await createPost(values);
            resetForm();
            router.push(`/post/${BigInt(createdPost.id)}`);
          } catch (_error) {
            toast({
              title: '모집글 작성에 실패했습니다. 잠시 후 다시 시도해주세요.',
            });
          }
        }}
      />
    </section>
  );
}
