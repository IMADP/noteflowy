import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuLinkRemoveProps {
  note: Note;
}

export const NoteMenuLinkRemove = ({ note }: NoteMenuLinkRemoveProps) => {
  const notes = useNotes();

  return (
    <MenuItem onClick={() => notes.onUpdate({ ...note, link: undefined })}>
      Remove Link <div className="RightSlot"></div>
    </MenuItem>
  )
}