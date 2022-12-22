import { Button, IconButton, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { canDropNote, findNote } from 'feature/notes/note-util';
import { Note, useNotes } from 'feature/notes/use-notes';
import { useDrag, useDrop } from 'react-dnd';
import { BiDownArrowAlt, BiMove, BiUpArrowAlt } from 'react-icons/bi';

export const MoveButton = () => {
  const notes = useNotes();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

const MoveTree = ({ note }: MoveTreeProps) => {
  const notes = useNotes();

  // get the drag and preview refs
  const [, drag] = useDrag(() => ({
    type: 'note',
    item: { id: note.id }
  }));

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: 'note',
      drop: (droppedNote: Note) => notes.onMove(droppedNote.id, note.id),
      canDrop: (item: Note) => canDropNote(findNote(notes.rootNote, item.id)?.note, note),
      collect: (monitor) => ({
        canDrop: monitor.canDrop()
      })
    }), [note]
  );

  const noteDocument = new DOMParser().parseFromString(note.content, 'text/html');
  const title = noteDocument.querySelector("h1")?.textContent;

  return (
    <List ml={5} >

      <ListItem>

        {notes.currentNote.id !== note.id &&
          <IconButton
            size='sm'
            variant='outline'
            colorScheme='teal'
            aria-label='Send email'
            onClick={() => notes.onOrder(note, true)}
            icon={<BiUpArrowAlt />}
          />
        }

        {notes.currentNote.id !== note.id &&
          <IconButton
            size='sm'
            variant='outline'
            colorScheme='teal'
            aria-label='Send email'
            onClick={() => notes.onOrder(note, false)}
            icon={<BiDownArrowAlt />}
          />
        }

        <Button
          size='sm'
          cursor='move'
          colorScheme='teal'
          variant='outline'
          borderColor={canDrop ? 'green' : ''}
          ref={(node) => drag(drop(node))}>
          {title}
        </Button>

        {note.children.map((n: Note) => (
          <MoveTree key={n.id} note={n} noteParent={note} />
        ))}

      </ListItem>

    </List >
  )
}