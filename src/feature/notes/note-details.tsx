import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Note } from './use-notes';

interface NoteDetailsProps {
  note: Note;
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {
  const editor = useEditor({
    editable: false,
    content: note.details,
    extensions: [StarterKit, Underline],
  })

  if (!editor) {
    return null
  }

  return (
    <>
      {note.details && <EditorContent editor={editor} />}
    </>

  );
}