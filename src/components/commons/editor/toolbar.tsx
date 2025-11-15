import {
  type Editor,
  type EditorStateSnapshot,
  useEditorState,
} from '@tiptap/react';
import BoldIcon from '@/assets/icons/bold/16.svg';
import ItalicIcon from '@/assets/icons/italic/16.svg';
import BulletListIcon from '@/assets/icons/list/16.svg';
import StrikeIcon from '@/assets/icons/strike-through/16.svg';
import UnderlineIcon from '@/assets/icons/underline/16.svg';
import ToolbarButton from '@/components/commons/editor/toolbar-button';
import ToolbarTextDropdown from '@/components/commons/editor/toolbar-text-dropdown';
import { cn } from '@/utils/style.util';

function selectToolbarState(snapshot: EditorStateSnapshot<Editor | null>) {
  return {
    isBold: snapshot.editor?.isActive('bold') ?? false,
    canBold: snapshot.editor?.can().chain().toggleBold().run() ?? false,
    isItalic: snapshot.editor?.isActive('italic') ?? false,
    canItalic: snapshot.editor?.can().chain().toggleItalic().run() ?? false,
    isUnderline: snapshot.editor?.isActive('underline') ?? false,
    canUnderline:
      snapshot.editor?.can().chain().toggleUnderline().run() ?? false,
    isStrike: snapshot.editor?.isActive('strike') ?? false,
    canStrike: snapshot.editor?.can().chain().toggleStrike().run() ?? false,
    isCode: snapshot.editor?.isActive('code') ?? false,
    canCode: snapshot.editor?.can().chain().toggleCode().run() ?? false,
    canClearMarks:
      snapshot.editor?.can().chain().unsetAllMarks().run() ?? false,
    isParagraph: snapshot.editor?.isActive('paragraph') ?? false,
    isHeading1: snapshot.editor?.isActive('heading', { level: 1 }) ?? false,
    isHeading2: snapshot.editor?.isActive('heading', { level: 2 }) ?? false,
    isHeading3: snapshot.editor?.isActive('heading', { level: 3 }) ?? false,
    isHeading4: snapshot.editor?.isActive('heading', { level: 4 }) ?? false,
    isHeading5: snapshot.editor?.isActive('heading', { level: 5 }) ?? false,
    isHeading6: snapshot.editor?.isActive('heading', { level: 6 }) ?? false,
    isBulletList: snapshot.editor?.isActive('bulletList') ?? false,
    isOrderedList: snapshot.editor?.isActive('orderedList') ?? false,
    isCodeBlock: snapshot.editor?.isActive('codeBlock') ?? false,
    isBlockquote: snapshot.editor?.isActive('blockquote') ?? false,
    canUndo: snapshot.editor?.can().chain().undo().run() ?? false,
    canRedo: snapshot.editor?.can().chain().redo().run() ?? false,
  };
}

type ToolbarSnapshot = ReturnType<typeof selectToolbarState>;

interface ToolbarButtonConfig {
  key: string;
  Icon: React.ComponentType;
  isActive: (state: ToolbarSnapshot | null) => boolean;
  toggle: (instance: Editor | null) => void;
}

const BUTTON_CONFIGS: ToolbarButtonConfig[] = [
  {
    key: 'bulletList',
    Icon: BulletListIcon,
    isActive: (editorState) => editorState?.isBulletList ?? false,
    toggle: (instance) => instance?.chain().focus().toggleBulletList().run(),
  },
  {
    key: 'bold',
    Icon: BoldIcon,
    isActive: (editorState) => editorState?.isBold ?? false,
    toggle: (instance) => instance?.chain().focus().toggleBold().run(),
  },
  {
    key: 'italic',
    Icon: ItalicIcon,
    isActive: (state) => state?.isItalic ?? false,
    toggle: (instance) => instance?.chain().focus().toggleItalic().run(),
  },
  {
    key: 'underline',
    Icon: UnderlineIcon,
    isActive: (state) => state?.isUnderline ?? false,
    toggle: (instance) => instance?.chain().focus().toggleUnderline().run(),
  },
  {
    key: 'strike',
    Icon: StrikeIcon,
    isActive: (state) => state?.isStrike ?? false,
    toggle: (instance) => instance?.chain().focus().toggleStrike().run(),
  },
];

interface ToolbarProps {
  editor: Editor | null;
  isError: boolean;
}

export default function Toolbar({ editor, isError }: ToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: selectToolbarState,
  });

  return (
    <div
      className={cn(
        'h-9 rounded-t-md bg-container-primary border-1 border-b-0 border-border-primary flex justify-between items-center px-4',
        isError && 'border-border-error',
      )}
    >
      <ToolbarTextDropdown editor={editor} />

      <div className="flex gap-5">
        {BUTTON_CONFIGS.map(({ key, Icon, isActive, toggle }) => (
          <ToolbarButton
            key={key}
            onClick={() => toggle(editor)}
            isActive={isActive(editorState)}
          >
            <Icon />
          </ToolbarButton>
        ))}
      </div>
    </div>
  );
}
