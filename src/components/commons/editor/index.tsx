'use client';

import { Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import Toolbar from '@/components/commons/editor/toolbar';
import { cn } from '@/utils/style.util';

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  onBlur?: () => void;
  isError?: boolean;
}

export default function TiptapEditor({
  value = '',
  onChange,
  onBlur,
  isError = false,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          '프로젝트의 목표, 진행 방식, 찾고 있는 팀원에 대해 자세히 설명해 주세요.',
      }),
    ],
    content: value,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-full h-full px-4 pt-4',
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value ?? '', { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor || !onBlur) return;
    const handleBlur = () => onBlur();
    editor.on('blur', handleBlur);
    return () => {
      editor.off('blur', handleBlur);
    };
  }, [editor, onBlur]);

  return (
    <article className="flex flex-col">
      <Toolbar editor={editor} isError={isError} />
      <EditorContent
        editor={editor}
        className={cn(
          'h-[480px] rounded-b-md border-1 border-t-0 border-border-primary overflow-auto',
          isError && 'border-border-error',
        )}
      />
    </article>
  );
}
