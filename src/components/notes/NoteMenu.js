import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DotIcon
} from '@radix-ui/react-icons';
import './NoteMenu.css';
import NoteDeleteDialog from './NoteDeleteDialog';


const DropdownMenuDemo = ({ note, onAdd, onDelete, handleAddDetails }) => {

  return (
    <span className="NoteMenu">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="IconButton" aria-label="Customise options">
            <DotIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => onAdd(note)}>
              Duplicate Note <div className="RightSlot"></div>
            </DropdownMenu.Item>
            <NoteDeleteDialog note={note} onDelete={onDelete}>
              <DropdownMenu.Item className="DropdownMenuItem" onSelect={(event) => event.preventDefault()}>
                Delete Note <div className="RightSlot"></div>
              </DropdownMenu.Item>
            </NoteDeleteDialog>
            <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => handleAddDetails()}>
              Add Details
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};

export default DropdownMenuDemo;