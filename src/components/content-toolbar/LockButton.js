import { LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import { visitNoteTree } from '../appUtil';

function LockButton({ notes, noteActions }) {
  let allUnlocked = true;

  // look through each note to see if any are locked
  visitNoteTree(notes, (note) => {
    if (note.locked) {
      allUnlocked = false;
    }
  });

  return (
    <>

      {!allUnlocked &&
        <button onClick={() => noteActions.onUpdateAll(notes, (note) => { note.locked = false })} >
          <LockClosedIcon />
        </button>
      }

      {allUnlocked &&
        <button onClick={() => noteActions.onUpdateAll(notes, (note) => { note.locked = true })} >
          <LockOpen1Icon />
        </button>
      }

    </>

  );
}

export default LockButton;
