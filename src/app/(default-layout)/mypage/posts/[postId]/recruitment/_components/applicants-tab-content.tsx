'use client';

import AppliedApplicantsSection from './applicants/applied-applicants-section';
import OfferedApplicantsSection from './applicants/offered-applicants-section';

interface ApplicantsTabContentProps {
  postId: bigint;
}

export default function ApplicantsTabContent({
  postId,
}: ApplicantsTabContentProps) {
  return (
    <div className="col-span-full flex flex-col gap-11">
      <OfferedApplicantsSection postId={postId} />
      <AppliedApplicantsSection postId={postId} />
    </div>
  );
}
