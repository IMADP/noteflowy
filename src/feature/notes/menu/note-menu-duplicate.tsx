import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuDuplicateProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteMenuDuplicate = ({ note, noteParent }: NoteMenuDuplicateProps) => {
  const notes = useNotes();

  return (
    <MenuItem onClick={() => notes.onDuplicate(noteParent, note)}>
      Duplicate Note
    </MenuItem>
  )
}