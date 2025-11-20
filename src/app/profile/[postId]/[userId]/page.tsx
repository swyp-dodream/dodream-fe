import ApplicantProfile from './_components/applicant-profile';

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

  return <ApplicantProfile postId={BigInt(postId)} userId={BigInt(userId)} />;
}
