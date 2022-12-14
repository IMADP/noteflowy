import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from './use-notes';

interface NoteMenuCompleteProps {
  note: Note;
}

export const NoteMenuComplete = ({ note }: NoteMenuCompleteProps) => {
  const notes = useNotes();

  return (
    <MenuItem onClick={() => notes.onUpdate({ ...note, completed: !note.completed })}>
      {note.completed ? 'Uncomplete' : 'Complete'}
    </MenuItem>
  )
}