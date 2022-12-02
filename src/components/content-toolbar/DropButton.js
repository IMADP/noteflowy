import { PaddingIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useDrop } from 'react-dnd';

function DropButton({ note, noteActions }) {

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: 'note',
      drop: (droppedNote) => noteActions.onMove(droppedNote.id, note.id),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop()
      })
    }), [note]
  );
  return (
    <>
      {canDrop && <span ref={drop} >
        <PaddingIcon style={{ color: 'green'}} />
      </span>}
    </>
  );
}

export default DropButton;
