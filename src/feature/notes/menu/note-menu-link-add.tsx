import { Button, FormControl, FormLabel, Input, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Note, useNotes } from '../use-notes';

interface NoteMenuLinkAddProps {
  note: Note;
}

export const NoteMenuLinkAdd = ({ note }: NoteMenuLinkAddProps) => {
  const notes = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef(null)

  const formHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // retrieve form data
    const formData = new FormData(event.currentTarget);
    const link = formData.get("link") as string;

    notes.onUpdate({ ...note, link })
  }

  return (
    <MenuItem onClick={onOpen} >
      Add Hyperlink

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
              <Input type="url" name="link" ref={ref} />
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