import { Menu, MenuButton, MenuDivider, MenuList } from '@chakra-ui/react';
import { useDrag, useDrop } from 'react-dnd';
import { BiBullseye, BiLockOpen } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { findNote, isDescendent } from '../notes-util';
import { Note, useNotes } from '../use-notes';
import { NoteMenuAdd } from './note-menu-add';
import { NoteMenuComplete } from './note-menu-complete';
import { NoteMenuDelete } from './note-menu-delete';
import { NoteMenuDetails } from './note-menu-details';
import { NoteMenuDuplicate } from './note-menu-duplicate';
import { NoteMenuLink } from './note-menu-link';
import { NoteMenuLock } from './note-menu-lock';

interface NoteMenuProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteMenu = ({ note, noteParent }: NoteMenuProps) => {
  const notes = useNotes();
  const navigate = useNavigate();

  // get the drag and preview refs
  const [, drag,] = useDrag(() => ({
    type: 'note',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })

  }));

  // determines if a dragged note can be nested under the current note
  const canDropFunction = (draggedNote: Note) => {

    // don't allow dragging to itself
    if (draggedNote.id === note.id) {
      return false;
    }

    const results = findNote(notes.rootNote, draggedNote.id);

    // this shouldn't happen
    if (!results) {
      return false;
    }

    // don't allow dragging to direct parent
    if (note.children.find(n => n.id === draggedNote.id)) {
      return false;
    }

    // don't allow a parent note to be dragged into a descendent
    return !isDescendent(results.note, note.id);
  }

  const [, drop] = useDrop(
    () => ({
      accept: 'note',
      drop: (droppedNote) => notes.onMove(droppedNote.id, note.id),
      canDrop: canDropFunction,
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop()
      })
    }), [note]
  );

  const onRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/note/${note.id}`);
  };

  return (
    <Menu>
      <MenuButton p={2} aria-label='Options' onContextMenu={onRightClick} ref={(node) => drag(drop(node))}>
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