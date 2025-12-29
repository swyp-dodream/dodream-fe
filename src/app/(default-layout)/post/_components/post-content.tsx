'use client';

import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';

interface PostContentProps {
  content: string;
  maxHeight: number;
}

/**
 * 모집글 상세 내용
 * @param content - 내용 (HTML 형식)
 * @param maxHeight - 더 보기 이전 최대 높이 px
 */
export default function PostContent({ content, maxHeight }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setIsOverflow(height > maxHeight);
    }
  }, [maxHeight]);

  return (
    <>
      <div className="relative">
        <div
          ref={contentRef}
          className={`prose prose-slate prose-h1:heading-md prose-p:body-lg-regular [&_p+h1]:mt-8 [&_h1+p]:mt-5 max-w-none overflow-hidden`}
          style={
            !isExpanded && isOverflow
              ? { maxHeight: `${maxHeight}px` }
              : undefined
          }
        >
          {parse(content)}
        </div>

        {isOverflow && !isExpanded && (
          <div
            aria-hidden={true}
            className="absolute bottom-0 left-0 right-0 w-full h-15 bg-linear-to-b from-bg-dropdown-white-10 to-bg-surface pointer-events-none"
          />
        )}
      </div>

      {isOverflow && !isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full p-3 border border-border-primary rounded-md body-lg-medium"
        >
          모집 내용 더 보기
        </button>
      )}
    </>
  );
}
