import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiBullseye } from 'react-icons/bi';
import { Note } from './use-notes';

interface NoteMenuProps {
  note: Note;
}

export const NoteMenu = ({ note }: NoteMenuProps) => {
  return (
    <Menu  >
      <MenuButton p={2}
        aria-label='Options'
      >
        <BiBullseye />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<BiBullseye />} command='⌘T'>
          New Tab
        </MenuItem>
        <MenuItem icon={<BiBullseye />} command='⌘N'>
          New Window
        </MenuItem>
        <MenuItem icon={<BiBullseye />} command='⌘⇧N'>
          Open Closed Tab
        </MenuItem>
        <MenuItem icon={<BiBullseye />} command='⌘O'>
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  )
}