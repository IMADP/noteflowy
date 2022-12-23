import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react';
import { useNotes } from 'feature/notes/use-notes';
import { useRef } from 'react';
import { BiUndo } from 'react-icons/bi';

export const RevertButton = () => {
  const notes = useNotes();
  const cancelRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onRevert = () => {
    notes.onRevert();
  };

  return (
    <>
    <Button
      color='tomato'
      onClick={onOpen}
      leftIcon={<BiUndo />}>
      Revert
    </Button>

    <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Revert Changes
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This will revert all your current changes since the last time you saved.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={onRevert} ml={3}>
                  Revert
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
    </>
  )
}