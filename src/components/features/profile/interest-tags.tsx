interface InterestTagsProps {
  interests: string[];
}

/**
 * 프로필 페이지의 관심분야 태그 리스트
 */
export default function InterestTags({ interests }: InterestTagsProps) {
  return (
    <ul className="flex gap-3 body-lg-regular" aria-label="관심 분야 목록">
      {interests.map((interest) => (
        <InterestTag label={interest} key={interest} />
      ))}
    </ul>
  );
}

interface InterestTagProps {
  label: string;
}

function InterestTag({ label }: InterestTagProps) {
  return <li className="bg-primary py-2 px-4 rounded-full w-fit">{label}</li>;
}
