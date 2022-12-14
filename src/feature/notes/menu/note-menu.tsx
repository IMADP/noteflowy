import { Menu, MenuButton, MenuDivider, MenuList } from '@chakra-ui/react';
import { BiBullseye, BiLockOpen, BiLockOpenAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { NoteMenuAdd } from './note-menu-add';
import { NoteMenuComplete } from './note-menu-complete';
import { NoteMenuDelete } from './note-menu-delete';
import { NoteMenuDetails } from './note-menu-details';
import { NoteMenuDuplicate } from './note-menu-duplicate';
import { NoteMenuLink } from './note-menu-link';
import { NoteMenuLock } from './note-menu-lock';
import { Note } from '../use-notes';

interface NoteMenuProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteMenu = ({ note, noteParent }: NoteMenuProps) => {
  const navigate = useNavigate();

  const onRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/note/${note.id}`);
  };

  return (
    <Menu>
      <MenuButton p={2} aria-label='Options' onContextMenu={onRightClick} >
        {note.locked ? <BiLockOpen /> : <BiBullseye />}
      </MenuButton>
      <MenuList>

        {!note.locked &&
          <>
            <NoteMenuAdd note={note} />
            <NoteMenuDuplicate note={note} noteParent={noteParent} />
            <MenuDivider />
            <NoteMenuLock note={note} />
            <NoteMenuComplete note={note} />
            <NoteMenuDetails note={note} />
            <NoteMenuLink note={note} />
            <MenuDivider />
            <NoteMenuDelete note={note} />
          </>
        }

        {note.locked &&
          <>
            <NoteMenuLock note={note} />
          </>
        }
        
      </MenuList>
    </Menu>
  )
}