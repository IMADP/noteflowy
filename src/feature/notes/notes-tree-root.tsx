import { IconButton, List, ListItem } from '@chakra-ui/react';
import { BiPlusCircle } from 'react-icons/bi';
import { NotesTree } from './notes-tree';
import { Note } from './use-notes';

interface NotesTreeProps {
  note: Note;
}

export const NotesTreeRoot = ({ note }: NotesTreeProps) => {

  return (
    <>
      {note.root && note.children.map((n: Note) => (
        <NotesTree key={n.id} note={n} />
      ))}

      <List ml={5} mb={5}>

        {note.root &&
          <ListItem>
            <IconButton aria-label='Add Note' icon={<BiPlusCircle />} ></IconButton >
          </ListItem>
        }

      </List>
    </>
  )
}