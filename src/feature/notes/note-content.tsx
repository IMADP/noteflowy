import { Box } from '@chakra-ui/react';
import Link from '@tiptap/extension-link';
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
    extensions: [
      StarterKit, 
      Underline,
      Link.configure({
        openOnClick: true,
      }),],
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
      {note.content && 
      <Box color='grey' my="1">
        <EditorContent editor={editor} />
      </Box>}
    </>

  );
}