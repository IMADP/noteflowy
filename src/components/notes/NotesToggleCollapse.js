import { TriangleRightIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { visitNotes } from './notesUtil';

function NotesToggleCollapse({ notes, noteActions }) {
  let allUncollapsed = true;

  // look through each note to see if any are collapsed
  visitNotes(notes, (note) => {
    if (note.collapsed) {
      allUncollapsed = false;
    }
  });

  return (
    <>

      {!allUncollapsed &&
        <button onClick={() => noteActions.onToggleCollapseAll(notes, false)} >
          <TriangleRightIcon />
        </button>
      }

      {allUncollapsed &&
        <button onClick={() => noteActions.onToggleCollapseAll(notes, true)} >
          <TriangleDownIcon />
        </button>
      }

    </>

  );
}

export default NotesToggleCollapse;
