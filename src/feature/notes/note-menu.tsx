import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const onRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/note/${note.id}`);
  };

  const onDelete = () => {
    notes.onDelete(note.id);
    onClose();
  };

  return (
    <>
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
        <MenuDivider />
        <MenuItem onClick={onOpen} color={"red"}>
          Delete Note
        </MenuItem>
      </MenuList>
    </Menu>

    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will delete the note and all sub-notes.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </>
  )
}