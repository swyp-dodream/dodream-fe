import ProfileContent from '../../_components/profile-content';

interface ApplicantProfilePageProps {
  params: Promise<{
    userId: string;
    postId: string;
  }>;
}

export default async function ApplicantProfilePage({
  params,
}: ApplicantProfilePageProps) {
  const { userId, postId } = await params;

  return <ProfileContent userId={BigInt(userId)} postId={BigInt(postId)} />;
}
