import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Note, useNotes } from './use-notes';

interface NoteMenuDeleteProps {
  note: Note;
  open: boolean;
}

export const NoteMenuDelete = ({ note, open }: NoteMenuDeleteProps) => {
  const notes = useNotes();
  const cancelRef = useRef<any>();
  const { isOpen, onClose } = useDisclosure({ isOpen: open });

  const onDelete = () => {
    notes.onDelete(note.id);
    onClose();
  };

  return (
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
  )
}