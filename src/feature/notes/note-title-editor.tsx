import { Input } from '@chakra-ui/input';
import { useEffect, useState } from 'react';
import { Note, useNotes } from './use-notes';

interface NoteTitleEditorProps {
  note: Note;
}

export const NoteTitleEditor = ({ note }: NoteTitleEditorProps) => {
  const notes = useNotes();
  const [title, setTitle] = useState(note.title);

  useEffect(() => {
    setTitle(note.title);
  }, [note]);

  return (
    <Input
      value={title}
      placeholder='Note title...'
      onChange={(e) => setTitle(e.target.value)}
      onBlur={() => notes.onUpdate({ ...note, title })} />
  );
}