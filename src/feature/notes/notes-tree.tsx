import { Box, List, ListItem } from '@chakra-ui/react';
import { NoteMenu } from './note-menu';
import { NoteText } from './note-text';
import { Note } from './use-notes';

interface NotesTreeProps {
  note: Note;
}

export const NotesTree = ({ note }: NotesTreeProps) => {
  return (
    <List ml={5} mb={5}>

      <ListItem>

        <NoteMenu note={note} />
        <NoteText note={note} />

        {note.children.map((n: Note) => (
          <Box key={n.id} mt={5}>
            <NotesTree note={n} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}