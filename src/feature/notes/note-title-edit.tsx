import { Input } from '@chakra-ui/input';
import { useEffect, useState } from 'react';
import { Note, useNotes } from './use-notes';

interface NoteTitleEditProps {
  note: Note;
}

export const NoteTitleEdit = ({ note }: NoteTitleEditProps) => {
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