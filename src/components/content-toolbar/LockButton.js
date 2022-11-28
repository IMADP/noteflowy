import { LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import { visitNoteTree } from '../appUtil';

function LockButton({ rootNote, noteActions }) {
  let allLocked = true;
 
  // look through each note to see if any are locked
  visitNoteTree(rootNote, (note) => {
    if (!note.locked) {
      allLocked = false;
    }
  });

  return (
    <>

      {allLocked &&
        <button onClick={() => noteActions.onUpdateAll(rootNote, (note) => { note.locked = false })} >
          <LockClosedIcon />
        </button>
      }

      {!allLocked &&
        <button onClick={() => noteActions.onUpdateAll(rootNote, (note) => { note.locked = true })} >
          <LockOpen1Icon />
        </button>
      }

    </>

  );
}

export default LockButton;
