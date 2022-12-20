import { Box, Center, Flex, List, ListItem, Text } from '@chakra-ui/react';

import { BiArrowFromTop } from 'react-icons/bi';
import { NoteDetails } from './note-details';
import { NoteDetailsEditor } from './note-details-editor';
import { NoteEditToolbar } from './note-edit-toolbar';
import { NoteLink } from './note-link';
import { NoteText } from './note-text-editor';
import { Note, useNotes } from './use-notes';

interface NoteTreeProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteTree = ({ note, noteParent }: NoteTreeProps) => {
  const notes = useNotes();

  return (
    <List ml={5} mt={5}>

      <ListItem>

        <Flex color='black' mr="10">
          <Center pt='1' bg='white'>
            <NoteLink note={note} />
          </Center>
          <Box p='1' flex='1' bg='white'>
            {notes.rootNote.edit && <NoteText note={note} />}
            {!notes.rootNote.edit && <Text style={{fontWeight: 600}}>{note.text}</Text>}
          </Box>
        </Flex>

        <Flex color='black' mr="10">
          <Box pt='2' pr="2" bg="white">
            <BiArrowFromTop style={{ visibility: 'hidden' }} />
          </Box>
          <Box p='1' flex='1' bg="white" >
            {notes.rootNote.edit && <NoteDetailsEditor note={note} />}
            {!notes.rootNote.edit && <NoteDetails note={note} />}
          </Box>
        </Flex>

        {notes.rootNote.edit &&
          <Flex color='black' mt='1' mr="10">
            <Box pt='2' pr="2" bg="white">
              <BiArrowFromTop style={{ visibility: 'hidden' }} />
            </Box>
            <Box p='1'>
              <NoteEditToolbar note={note} noteParent={noteParent} />
            </Box>
          </Flex>
        }

        {note.children.map((n: Note) => (
          <Box key={n.id} >
            <NoteTree note={n} noteParent={note} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}