interface RecommendTypesProps {
  labels: string[];
}

// TODO: 타입 다를 경우 props 수정
export default function RecommendTypes({ labels }: RecommendTypesProps) {
  return (
    <ul className="flex gap-2">
      {labels.map((label) => (
        <RecommendType key={label} label={label} />
      ))}
    </ul>
  );
}

interface RecommendTypeProps {
  label: string;
}

/**
 * AI 추천 게시글 타입
 * @param label - 타입 텍스트 (나와맞는기술스택, 내직군모집중 등)
 */
function RecommendType({ label }: RecommendTypeProps) {
  return (
    <li className="text-brand bg-button-ai body-sm-medium py-1 px-3 rounded-md">
      {label}
    </li>
  );
}
