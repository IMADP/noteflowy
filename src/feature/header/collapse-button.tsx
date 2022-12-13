import { Button } from '@chakra-ui/react';
import { visitNoteTree } from 'feature/notes/notes-util';
import { useNotes } from 'feature/notes/use-notes';
import { BiArrowToBottom, BiArrowToRight } from 'react-icons/bi';

export const CollapseButton = () => {
  const notes = useNotes();
  const currentNote = notes.currentNote;
  let allUncollapsed = true;

  // look through each note to see if any are collapsed
  visitNoteTree(currentNote, (n) => {
    if (n.collapsed) {
      allUncollapsed = false;
    }
  });

  return (
    <>
      {!allUncollapsed &&
        <Button onClick={() => notes.onUpdateAll(currentNote, (n) => { n.collapsed = false })} leftIcon={<BiArrowToRight />}>Uncollapse</Button>

      }

      {allUncollapsed &&
        <Button onClick={() => notes.onUpdateAll(currentNote, (n) => { n.collapsed = true })} leftIcon={<BiArrowToBottom />}>Collapse</Button>
      }
    </>
  )
}