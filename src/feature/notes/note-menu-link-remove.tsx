import { MenuItem } from '@chakra-ui/react';
import { Note, useNotes } from './use-notes';

interface NoteMenuLinkRemoveProps {
  note: Note;
}

export const NoteMenuLinkRemove = ({ note }: NoteMenuLinkRemoveProps) => {
  const notes = useNotes();

  return (
    <MenuItem onSelect={() => notes.onUpdate({ ...note, link: null })}>
      Remove Link <div className="RightSlot"></div>
    </MenuItem>
  )
}