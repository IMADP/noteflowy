import { Button } from '@chakra-ui/react';
import { visitNoteTree } from 'feature/notes/notes-util';
import { useNotes } from 'feature/notes/use-notes';
import { BiLockOpen, BiLockOpenAlt } from 'react-icons/bi';

export const LockButton = () => {
  const notes = useNotes();
  let allLocked = true;

  // look through each note to see if any are locked
  visitNoteTree(notes.currentNote, (n) => {
    if (!n.locked) {
      allLocked = false;
    }
  });

  return (
    <>
      {allLocked &&
        <Button onClick={() => notes.onUpdateAll(notes.currentNote, (n) => { n.locked = false })} leftIcon={<BiLockOpenAlt />}>Unlock</Button>

      }

      {!allLocked &&
        <Button onClick={() => notes.onUpdateAll(notes.currentNote, (n) => { n.locked = true })} leftIcon={<BiLockOpen />}>Lock</Button>
      }
    </>
  )
}