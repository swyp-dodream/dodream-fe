'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PostForm from '@/app/(header-only)/posts/_components/post-form';
import {
  INTEREST_KEYWORDS,
  type InterestKeyword,
} from '@/constants/interest.constant';
import { ROLES, type RoleName } from '@/constants/role.constant';
import { TECH_SKILLS, type TechSkill } from '@/constants/tech-skill.constant';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import useUpdatePost from '@/hooks/post/use-update-post';
import useToast from '@/hooks/use-toast';
import usePostCreateStore from '@/store/post-create-store';

const getRoleIdByName = (name: RoleName): number | undefined => {
  const role = ROLES.find((role) => role.name === name);
  return role ? Number(role.id) : undefined;
};

export default function PostEditPage() {
  const toast = useToast();
  const router = useRouter();
  const params = useParams<{ postId: string }>();
  const { data: postDetail, isPending } = useGetPostDetail(
    BigInt(params.postId),
  );
  const { mutateAsync: updatePost, isPending: updatePending } = useUpdatePost();
  const setInterests = usePostCreateStore((state) => state.setInterests);
  const setStacks = usePostCreateStore((state) => state.setStacks);
  const resetForm = usePostCreateStore((state) => state.reset);

  useEffect(() => {
    if (!postDetail) return;

    const interests = postDetail.interestKeywords
      .map((keyword) => INTEREST_KEYWORDS.find(({ name }) => name === keyword))
      .filter((interest): interest is InterestKeyword => Boolean(interest));
    setInterests(interests);

    const stacks = postDetail.stacks
      .map((stackName) => TECH_SKILLS.find(({ name }) => name === stackName))
      .filter((stack): stack is TechSkill => Boolean(stack));
    setStacks(stacks);
  }, [postDetail, setInterests, setStacks]);

  if (!postDetail || isPending) {
    return null;
  }

  return (
    <section className="w-[792px] flex flex-col gap-9">
      <header className="pb-7 border-b-1 border-border-primary">
        <h1 className="heading-xl text-primary">모집글</h1>
      </header>

      <PostForm
        defaultValues={{
          title: postDetail?.title,
          projectType: postDetail?.projectType,
          interestIds: [],
          roles: postDetail?.roles
            .map(({ role, headcount }) => {
              return {
                roleId: getRoleIdByName(role as RoleName),
                count: headcount,
              };
            })
            .filter(
              (role): role is { roleId: number; count: number } =>
                typeof role.roleId === 'number',
            ),
          stackIds: [],
          content: postDetail?.content,
          activityMode: postDetail?.activityMode,
          duration: postDetail?.duration,
          deadlineAt: new Date(postDetail?.deadlineDate as string),
        }}
        submitLabel="수정"
        isSubmitting={updatePending}
        onSubmit={async (values) => {
          try {
            await updatePost({ postId: BigInt(params.postId), form: values });
            resetForm();
            router.push(`/post/${BigInt(params.postId)}`);
          } catch (_error) {
            toast({ title: '수정에 실패했습니다. 잠시 후 다시 시도해주세요.' });
          }
        }}
      />
    </section>
  );
}
