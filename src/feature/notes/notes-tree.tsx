import { Box, List, ListItem } from '@chakra-ui/react';
import { NoteDetails } from './note-details';
import { NoteMenu } from './note-menu';
import { NoteText } from './note-text';
import { Note } from './use-notes';

interface NotesTreeProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NotesTree = ({ note, noteParent }: NotesTreeProps) => {
  return (
    <List ml={5} mb={5}>

      <ListItem>

        <NoteMenu note={note} noteParent={noteParent}/>
        <NoteText note={note} noteParent={noteParent} />
        <NoteDetails note={note} />

        {note.children.map((n: Note) => (
          <Box key={n.id} mt={5}>
            <NotesTree note={n} noteParent={note} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}