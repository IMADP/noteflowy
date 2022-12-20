import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Note } from './use-notes';

interface NoteContentProps {
  note: Note;
}

export const NoteContent = ({ note }: NoteContentProps) => {
  const editor = useEditor({
    editable: false,
    content: note.content,
    extensions: [StarterKit, Underline],
  })

  if (!editor) {
    return null
  }

  return (
    <>
      {note.content && <EditorContent editor={editor} />}
    </>

  );
}