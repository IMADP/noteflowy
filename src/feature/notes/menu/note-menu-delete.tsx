import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, MenuItem, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuDeleteProps {
  note: Note;
}

export const NoteMenuDelete = ({ note }: NoteMenuDeleteProps) => {
  const notes = useNotes();
  const cancelRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    notes.onDelete(note.id);
    onClose();
  };

  return (
    <MenuItem onClick={onOpen} color={"red"}>
      Delete Note

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
    </MenuItem>
  )
}