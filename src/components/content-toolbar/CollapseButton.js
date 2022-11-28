import { TriangleRightIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { visitNoteTree } from '../appUtil';

function CollapseButton({ note, noteActions }) {
  let allUncollapsed = true;

  // look through each note to see if any are collapsed
  visitNoteTree(note, (n) => {
    if (n.collapsed) {
      allUncollapsed = false;
    }
  });

  return (
    <>

      {!allUncollapsed &&
        <button onClick={() => noteActions.onUpdateAll(note, (n) => { n.collapsed = false })} >
          <TriangleRightIcon />
        </button>
      }

      {allUncollapsed &&
        <button onClick={() => noteActions.onUpdateAll(note, (n) => { n.collapsed = true })} >
          <TriangleDownIcon />
        </button>
      }

    </>

  );
}

export default CollapseButton;
