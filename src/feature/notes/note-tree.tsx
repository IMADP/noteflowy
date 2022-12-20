import { Box, Flex, List, ListItem, VStack } from '@chakra-ui/react';
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

        <Flex mr="10">
          <Box mt="1">
            <NoteLink note={note} />
          </Box>
          <Box p='1' flex='1'>
            <VStack spacing={3} align='stretch'>

              <Box>
                {notes.rootNote.edit && <NoteTitleEditor note={note} />}
                {!notes.rootNote.edit && <NoteTitle note={note} />}
              </Box>

              {(note.content || notes.rootNote.edit) &&
                <Box>
                  {notes.rootNote.edit && <NoteContentEditor note={note} />}
                  {!notes.rootNote.edit && <NoteContent note={note} />}
                </Box>
              }

              {notes.rootNote.edit &&
                <Box>
                  <NoteEditToolbar note={note} noteParent={noteParent} />
                </Box>
              }
            </VStack>
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