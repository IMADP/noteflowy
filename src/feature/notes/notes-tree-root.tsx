import { IconButton, List, ListItem } from '@chakra-ui/react';
import { BiPlusCircle } from 'react-icons/bi';
import { NotesTree } from './notes-tree';
import { Note, useNotes } from './use-notes';

interface NotesTreeProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NotesTreeRoot = ({ note, noteParent }: NotesTreeProps) => {
  const notes = useNotes();

  return (
    <>
      {note.root && note.children.map((n: Note) => (
        <NotesTree key={n.id} note={n} noteParent={undefined} />
      ))}

      <List ml={5} mb={5}>

        {note.root &&
          <ListItem ml={2}>
            <BiPlusCircle cursor="pointer" aria-label='Add Note' onClick={() => notes.onAdd(note)} />
          </ListItem>
        }

      </List>
    </>
  )
}