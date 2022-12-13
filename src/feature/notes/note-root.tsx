import { List, ListItem } from '@chakra-ui/react';
import { BiPlusCircle } from 'react-icons/bi';
import { NoteTree } from './note-tree';
import { Note, useNotes } from './use-notes';

interface NoteRootProps {
  note: Note;
}

export const NoteRoot = ({ note }: NoteRootProps) => {
  const notes = useNotes();

  return (
    <>
      {note.root && note.children.map((n: Note) => (
        <NoteTree key={n.id} note={n} noteParent={undefined} />
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