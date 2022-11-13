import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
  } from '@radix-ui/react-icons';
  import './NoteMenu.css';
import NoteDeleteDialog from './NoteDeleteDialog';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './NoteDeleteDialog.css';


const DropdownMenuDemo = ({note, onDelete}) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');
const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem" onSelect={() => onDelete(note.id)}>
            Delete Note <div className="RightSlot"></div>
          </DropdownMenu.Item>
            

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;