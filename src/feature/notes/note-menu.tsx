import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiBullseye } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Note, useNotes } from './use-notes';

interface NoteMenuProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteMenu = ({ note, noteParent }: NoteMenuProps) => {
  const notes = useNotes();
  const navigate = useNavigate();

  const onRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/note/${note.id}`);
  };

  return (
    <Menu  >
      <MenuButton p={2} aria-label='Options' onContextMenu={onRightClick} >
        <BiBullseye />
      </MenuButton>
      <MenuList>
        <MenuItem closeOnSelect={true} onClick={() => notes.onAddSubNote(note)}>
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