import { TriangleRightIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { visitNoteTree } from '../appUtil';

function CollapseButton({ rootNote, noteActions }) {
  let allUncollapsed = true;

  // look through each note to see if any are collapsed
  visitNoteTree(rootNote, (note) => {
    if (note.collapsed) {
      allUncollapsed = false;
    }
  });

  return (
    <>

      {!allUncollapsed &&
        <button onClick={() => noteActions.onUpdateAll(rootNote, (note) => { note.collapsed = false })} >
          <TriangleRightIcon />
        </button>
      }

      {allUncollapsed &&
        <button onClick={() => noteActions.onUpdateAll(rootNote, (note) => { note.collapsed = true })} >
          <TriangleDownIcon />
        </button>
      }

    </>

  );
}

export default CollapseButton;
