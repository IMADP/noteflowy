import { TriangleRightIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { visitNoteTree } from '../appUtil';

function CollapseButton({ notes, noteActions }) {
  let allUncollapsed = true;

  // look through each note to see if any are collapsed
  visitNoteTree(notes, (note) => {
    if (note.collapsed) {
      allUncollapsed = false;
    }
  });

  return (
    <>

      {!allUncollapsed &&
        <button onClick={() => noteActions.onUpdateAll(notes, (note) => { note.collapsed = false })} >
          <TriangleRightIcon />
        </button>
      }

      {allUncollapsed &&
        <button onClick={() => noteActions.onUpdateAll(notes, (note) => { note.collapsed = true })} >
          <TriangleDownIcon />
        </button>
      }

    </>

  );
}

export default CollapseButton;
