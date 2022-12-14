import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from './use-notes';

interface NoteMenuLockProps {
  note: Note;
}

export const NoteMenuLock = ({ note }: NoteMenuLockProps) => {
  const notes = useNotes();

  return (
    <MenuItem onClick={() => notes.onUpdate({ ...note, locked: !note.locked })}>
      {note.locked ? 'Unlock' : 'Lock'}
    </MenuItem>
  )
}