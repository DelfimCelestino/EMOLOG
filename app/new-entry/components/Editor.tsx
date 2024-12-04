"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, Quote, Heading2, Code } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Toolbar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-border/50 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 p-2 flex flex-wrap gap-1 sticky top-0">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-muted"
      >
        <Code className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] prose dark:prose-invert prose-sm max-w-none focus:outline-none p-4 " +
          "prose-headings:font-bold prose-h2:text-xl " +
          "prose-p:leading-relaxed " +
          "prose-pre:bg-muted prose-pre:rounded-lg prose-pre:p-4 " +
          "prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-4 prose-blockquote:italic " +
          "prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5",
      },
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden bg-background dark:bg-background shadow-sm">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
