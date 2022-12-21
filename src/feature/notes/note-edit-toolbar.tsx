import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, Stack, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { BiArrowFromLeft, BiArrowFromTop, BiCopyAlt, BiEraser } from 'react-icons/bi';
import { Note, useNotes } from './use-notes';

interface NoteEditToolbarProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteEditToolbar = ({ note, noteParent }: NoteEditToolbarProps) => {
  const notes = useNotes();
  const cancelRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    notes.onDelete(note.id);
    onClose();
  };

  return (

    <Stack direction='row' spacing={2}>

      <Tooltip hasArrow label='Clone Note'>
        <IconButton
          size='sm'
          variant='outline'
          color='gray'
          aria-label='Clone Note'
          onClick={() => notes.onDuplicate(noteParent, note)}
          icon={<BiCopyAlt />}
        />
      </Tooltip>

      <Tooltip hasArrow label='Delete Note'>
        <IconButton
          size='sm'
          variant='outline'
          color='gray'
          aria-label='Delete Note'
          disabled={notes.currentNote.root && notes.currentNote.children.length === 1}
          onClick={onOpen}
          icon={<BiEraser />}
        />
      </Tooltip>

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

    </Stack>
  )
}