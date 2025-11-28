import type { ReactNode } from 'react';

type LegalArticleProps = {
  title: string;
  children: ReactNode;
};

export function LegalArticle({ title, children }: LegalArticleProps) {
  return (
    <article className="flex flex-col gap-5">
      <h2 className="heading-sm">{title}</h2>
      {children}
    </article>
  );
}
