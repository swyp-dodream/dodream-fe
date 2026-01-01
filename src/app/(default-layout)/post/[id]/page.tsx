import PostPageClient from '../_components/post-page-client';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postId = BigInt(id);

  return <PostPageClient postId={postId} />;
}
