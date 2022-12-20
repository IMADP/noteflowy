import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
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

  // effect to update the editor on external note changes
  useEffect(() => {
    const editorContent = editor?.getHTML() || '';
    const noteContent = note.content;

    // this is necessary to prevent the content from changing focus unnecessarily
    if (editorContent !== noteContent) {
      editor?.commands.setContent(note.content);
    }
  }, [note, editor]);
  
  if (!editor) {
    return null
  }

  return (
    <>
      {note.content && <EditorContent editor={editor} />}
    </>

  );
}