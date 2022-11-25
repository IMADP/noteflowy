import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DiscIcon } from '@radix-ui/react-icons';
import './Menu.css';
import DeleteDialog from './DeleteDialog';


const DropdownMenuDemo = ({ note, parent, noteActions }) => {

  return (
    <span className="NoteMenu">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="IconButton" aria-label="Customise options">
            <DiscIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => noteActions.onAddSubNote(note)}>
              Add Sub Note <div className="RightSlot"></div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => noteActions.onDuplicate(parent, note)}>
              Clone Note <div className="RightSlot"></div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => noteActions.onUpdate({ ...note, locked: !note.locked })}>
              {note.locked ? 'Unlock' : 'Lock'} <div className="RightSlot"></div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => noteActions.onUpdate({ ...note, completed: !note.completed })}>
              {note.completed ? 'Uncomplete' : 'Complete'} <div className="RightSlot"></div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => noteActions.onUpdate({ ...note, showDetails: !note.showDetails})}>
              {note.showDetails ? 'Hide Details' : 'Show Details'} <div className="RightSlot"></div>
            </DropdownMenu.Item>
            <DeleteDialog note={note} onDelete={noteActions.onDelete}>
              <DropdownMenu.Item className="DropdownMenuItem" onSelect={(event) => event.preventDefault()}>
                Delete Note <div className="RightSlot"></div>
              </DropdownMenu.Item>
            </DeleteDialog>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default DropdownMenuDemo;