import { Button, FormControl, Input, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuLinkProps {
  note: Note;
}

export const NoteMenuLink = ({ note }: NoteMenuLinkProps) => {
  const notes = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef(null)

  const formHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // retrieve form data
    const formData = new FormData(event.currentTarget);
    const link = formData.get("link") as string;

    notes.onUpdate({ ...note, link })
    onClose();
  }

  return (
    <MenuItem onClick={onOpen} >
      {!note.link ? 'Add Hyperlink' : 'Edit Hyperlink'}

      <Modal
        initialFocusRef={ref}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formHandler}>
            <ModalHeader>Add URL</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input required={false} type="url" name="link" defaultValue={note.link || "https://"} ref={ref} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

    </MenuItem>
  )
}