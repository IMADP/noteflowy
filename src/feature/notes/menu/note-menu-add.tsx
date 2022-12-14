import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuAddProps {
  note: Note;
}

export const NoteMenuAdd = ({ note }: NoteMenuAddProps) => {
  const notes = useNotes();

  return (
    <MenuItem onClick={() => notes.onAddSubNote(note)}>
      Add Sub Note
    </MenuItem>
  )
}