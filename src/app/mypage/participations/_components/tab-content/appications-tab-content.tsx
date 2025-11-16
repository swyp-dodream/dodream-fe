'use client';

import MyApplicationPostCard from '@/components/features/post/post-card/presets/my-application-post-card';
import useGetMyAppliedPosts from '@/hooks/post/use-get-applied-posts';

export default function ApplicationsTabContent() {
  const { data: myAppliedPosts } = useGetMyAppliedPosts();
  console.log(myAppliedPosts);

  return (
    <>
      {myAppliedPosts?.applications?.map((myAppliedPost) => (
        <MyApplicationPostCard
          key={myAppliedPost.id}
          myAppliedPost={myAppliedPost}
        />
      ))}
    </>
  );
}
