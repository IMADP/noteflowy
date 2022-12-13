import { Box, List, ListItem } from '@chakra-ui/react';
import { NoteDetails } from './note-details';
import { NoteMenu } from './note-menu';
import { NoteText } from './note-text';
import { Note } from './use-notes';

interface NoteTreeProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteTree = ({ note, noteParent }: NoteTreeProps) => {
  return (
    <List ml={5} mb={5}>

      <ListItem>

        <NoteMenu note={note} noteParent={noteParent}/>
        <NoteText note={note} noteParent={noteParent} />
        <NoteDetails note={note} />

        {note.children.map((n: Note) => (
          <Box key={n.id} mt={5}>
            <NoteTree note={n} noteParent={note} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}