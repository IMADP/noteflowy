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
          <Box mt={notes.rootNote.edit ? 3 : 1}>
            <NoteLink note={note} />
          </Box>
          <Box p='1' flex='1'>
            <VStack spacing={3} align='stretch'>

              {note.title &&
                <>
                  {notes.rootNote.edit && <NoteTitleEditor note={note} />}
                  {!notes.rootNote.edit && <NoteTitle note={note} />}
                </>
              }

              {(note.content || notes.rootNote.edit) &&
                <>
                  {notes.rootNote.edit && <NoteContentEditor note={note} />}
                  {!notes.rootNote.edit && <NoteContent note={note} />}
                </>
              }

              {notes.rootNote.edit &&
                <NoteEditToolbar note={note} noteParent={noteParent} />
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