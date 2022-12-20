import { Button, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Note, useNotes } from 'feature/notes/use-notes';
import { BiMove } from 'react-icons/bi';

interface MoveButtonProps {

}

export const MoveButton = ({ }: MoveButtonProps) => {
  const notes = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = () => {

  };

  return (
    <>
      {notes.isEdit &&
        <>
          <Button
            onClick={onOpen}
            leftIcon={<BiMove />}>
            Move
          </Button>

          <Modal onClose={onClose} size='xl' isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Drag and Drop Notes</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <MoveTree note={notes.currentNote} noteParent={notes.currentNoteParent} />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    </>
  )
}

interface MoveTreeProps {
  note: Note;
  noteParent?: Note
}

const MoveTree = ({ note, noteParent }: MoveTreeProps) => {

  return (
    <List ml={5} >

      <ListItem>

        <Button cursor='move' colorScheme='teal' variant='outline'>
          {note.title}
        </Button>

        {note.children.map((n: Note) => (
          <MoveTree note={n} noteParent={note} />
        ))}

      </ListItem>

    </List>
  )
}