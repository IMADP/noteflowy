import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuDetailsProps {
  note: Note;
}

export const NoteMenuDetails = ({ note }: NoteMenuDetailsProps) => {
  const notes = useNotes();

  return (
    <MenuItem onClick={() => notes.onUpdate({ ...note, showDetails: !note.showDetails })}>
      {note.showDetails ? 'Hide Details' : 'Show Details'}
    </MenuItem>
  )
}