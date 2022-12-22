import { Box, Flex, List, ListItem, VStack } from '@chakra-ui/react';
import { NoteContentEdit } from './note-content-edit';
import { NoteLink } from './note-link';
import { Note } from './use-notes';

interface NoteTreeEditProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteTreeEdit = ({ note, noteParent }: NoteTreeEditProps) => {
  return (
    <List ml={5} mt={5}>

      <ListItem>

        <Flex mr="10">
          <Box mt={3}>
            <NoteLink note={note} />
          </Box>
          <Box p='1' flex='1'>
            <VStack spacing={3} align='stretch'>
              <NoteContentEdit note={note} noteParent={noteParent} />
            </VStack>
          </Box>
        </Flex>

        {note.children.map((n: Note) => (
          <Box key={n.id} >
            <NoteTreeEdit note={n} noteParent={note} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}