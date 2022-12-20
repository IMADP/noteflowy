import { Box, Center, Flex, List, ListItem } from '@chakra-ui/react';

import { BiArrowFromTop } from 'react-icons/bi';
import { NoteContent } from './note-content';
import { NoteContentEditor } from './note-content-editor';
import { NoteEditToolbar } from './note-edit-toolbar';
import { NoteLink } from './note-link';
import { NoteTitle } from './note-title';
import { NoteTitleEditor } from './note-title-editor';
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
            {notes.rootNote.edit && <NoteTitleEditor note={note} />}
            {!notes.rootNote.edit && <NoteTitle note={note} />}
          </Box>
        </Flex>

        {(note.content || notes.rootNote.edit) &&
          <Flex color='black' mr="10">
            <Box pt='2' pr="2" bg="white">
              <BiArrowFromTop style={{ visibility: 'hidden' }} />
            </Box>
            <Box p='1' flex='1' bg="white" >
              {notes.rootNote.edit && <NoteContentEditor note={note} />}
              {!notes.rootNote.edit && <NoteContent note={note} />}
            </Box>
          </Flex>
        }

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