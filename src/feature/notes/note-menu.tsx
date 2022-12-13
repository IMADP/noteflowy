import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiBullseye } from 'react-icons/bi';
import { Note, useNotes } from './use-notes';

interface NoteMenuProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteMenu = ({ note, noteParent }: NoteMenuProps) => {
  const notes = useNotes();

  return (
    <Menu>
      <MenuButton p={2} aria-label='Options'>
        <BiBullseye />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => notes.onAddSubNote(note)}>
          Add Sub Note
        </MenuItem>
        <MenuItem onClick={() => notes.onDuplicate(noteParent, note)}>
         Duplicate Note
        </MenuItem>
        <MenuItem onClick={() => notes.onUpdate({ ...note, locked: !note.locked })}>
        {note.locked ? 'Unlock' : 'Lock'}
        </MenuItem>
        <MenuItem onClick={() => notes.onUpdate({ ...note, completed: !note.completed })}>
        {note.completed ? 'Uncomplete' : 'Complete'} 
        </MenuItem>
        <MenuItem onClick={() => notes.onUpdate({ ...note, showDetails: !note.showDetails })}>
        {note.showDetails ? 'Hide Details' : 'Show Details'}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}