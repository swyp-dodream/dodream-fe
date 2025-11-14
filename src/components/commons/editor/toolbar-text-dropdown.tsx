import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { Editor } from '@tiptap/react';
import ChevronDownIcon from '@/assets/icons/chevron-down/14.svg';

interface ToolbarTextDropdownProps {
  editor: Editor | null;
}

const OPTIONS = [
  { value: 'heading1', label: '제목' },
  { value: 'paragraph', label: '본문' },
];

export default function ToolbarTextDropdown({
  editor,
}: ToolbarTextDropdownProps) {
  const currentValue = editor?.isActive('heading', { level: 1 })
    ? 'heading1'
    : 'paragraph';

  const handleSelect = (value: (typeof OPTIONS)[number]['value']) => {
    if (!editor) return;

    if (value === 'heading1') {
      if (!editor.isActive('heading', { level: 1 })) {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      }
      return;
    }

    if (!editor.isActive('paragraph')) {
      editor.chain().focus().setParagraph().run();
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="text-sm font-medium" asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          {OPTIONS.find((option) => option.value === currentValue)?.label}
          <ChevronDownIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="rounded border border-border-primary bg-white shadow-md p-1 text-sm">
          {OPTIONS.map(({ value, label }) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => handleSelect(value)}
              className="px-2 py-1 rounded data-highlighted:bg-container-primary-hover data-[state=checked]:font-semibold"
            >
              {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
