import { Input } from '@chakra-ui/input';
import { useEffect, useState } from 'react';
import { Note, useNotes } from '../use-notes';

interface NoteTextProps {
  note: Note;
}

export const NoteText = ({ note }: NoteTextProps) => {
  const notes = useNotes();
  const [text, setText] = useState(note.text);

  useEffect(() => {
    setText(note.text);
  }, [note]);

  return (
    <Input
      value={text}
      placeholder='Note text...'
      onChange={(e) => setText(e.target.value)}
      onBlur={() => notes.onUpdate({ ...note, text })} />
  );
}