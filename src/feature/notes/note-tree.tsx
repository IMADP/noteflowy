import { Box, Center, Flex, IconButton, List, ListItem, Stack, Tooltip } from '@chakra-ui/react';

import { BiArrowFromLeft, BiArrowFromTop, BiCopyAlt, BiEraser } from 'react-icons/bi';
import { NoteDetailsEditor } from './edit/note-details';
import { NoteText } from './edit/note-text';
import { NoteDetails } from './note-details';
import { NoteLink } from './note-link';
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
          <Center p='1' flex='1' bg='white'>
            <NoteText note={note} />
          </Center>
        </Flex>

        <Flex color='black' mr="10">
          <Box pt='2' pr="2" bg="white">
            <BiArrowFromTop style={{ visibility: 'hidden' }} />
          </Box>
          <Box p='1' flex='1' bg="white" >

          {note.locked && <NoteDetails note={note} />}
            {!note.locked && <NoteDetailsEditor note={note} />}
          </Box>
        </Flex>

        <Flex color='black' mt='1' mr="10">
          <Box pt='2' pr="2" bg="white">
            <BiArrowFromTop style={{ visibility: 'hidden' }} />
          </Box>
          <Box p='1'>

            <Stack direction='row' spacing={2}>

              <Tooltip hasArrow label='Add New Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Add another note'
                  disabled={notes.currentNote.id === note.id}
                  onClick={() => notes.onAdd(noteParent || notes.rootNote)}
                  icon={<BiArrowFromTop />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Add Child Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Add a child note'
                  onClick={() => notes.onAdd(note)}
                  icon={<BiArrowFromLeft />}
                />
              </Tooltip>


              <Tooltip hasArrow label='Clone Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Clone Note'
                  icon={<BiCopyAlt />}
                />
              </Tooltip>

              <Tooltip hasArrow label='Delete Note'>
                <IconButton
                  size='sm'
                  variant='outline'
                  color='gray'
                  aria-label='Delete Note'
                  icon={<BiEraser />}
                />
              </Tooltip>


            </Stack>
          </Box>
        </Flex>


        {note.children.map((n: Note) => (
          <Box key={n.id} >
            <NoteTree note={n} noteParent={note} />
          </Box>
        ))}

      </ListItem>

    </List>
  )
}