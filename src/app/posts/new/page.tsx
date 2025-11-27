'use client';

import PostForm from '@/app/posts/_components/post-form';
import useCreatePost from '@/hooks/post/use-create-post';
import { useRouter } from 'next/navigation';

export default function PostCreatePage() {
  const router = useRouter();
  const { mutateAsync: createPost, isPending } = useCreatePost();

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
          const createdPost = await createPost(values);
          router.push(`/post/${BigInt(createdPost.id)}`);
        }}
      />
    </section>
  );
}
