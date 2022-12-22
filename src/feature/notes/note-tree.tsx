import { Box, Flex, List, ListItem, VStack } from '@chakra-ui/react';
import { NoteContent } from './note-content';
import { NoteLink } from './note-link';
import { Note } from './use-notes';

interface NoteTreeProps {
  note: Note;
}

export const NoteTree = ({ note }: NoteTreeProps) => {
  return (
    <List ml={5} mt={5}>

      <ListItem>

        <Flex mr="10">
          <Box mt={1.5}>
            <NoteLink note={note} />
          </Box>
          <Box p='1' flex='1'>
            <VStack spacing={3} align='stretch'>
              <NoteContent note={note} />
            </VStack>
          </Box>
        </Flex>

        {note.children.map((n: Note) => (
          <Box key={n.id} >
            <NoteTree note={n} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}