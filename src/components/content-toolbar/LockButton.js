import { LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import { visitNoteTree } from '../appUtil';

function LockButton({ note, noteActions }) {
  let allLocked = true;
 
  // look through each note to see if any are locked
  visitNoteTree(note, (n) => {
    if (!n.locked) {
      allLocked = false;
    }
  });

  return (
    <>

      {allLocked &&
        <button onClick={() => noteActions.onUpdateAll(note, (n) => { n.locked = false })} >
          <LockClosedIcon />
        </button>
      }

      {!allLocked &&
        <button onClick={() => noteActions.onUpdateAll(note, (n) => { n.locked = true })} >
          <LockOpen1Icon />
        </button>
      }

    </>

  );
}

export default LockButton;
