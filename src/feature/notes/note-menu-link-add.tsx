import { Button, FormControl, FormLabel, Input, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Note, useNotes } from './use-notes';

interface NoteMenuLinkAddProps {
  note: Note;
}

export const NoteMenuLinkAdd = ({ note }: NoteMenuLinkAddProps) => {
  const notes = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef(null)

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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={ref} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </MenuItem>
  )
}