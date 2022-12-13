import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import { NoteTree } from './note-tree';
import { NoteRoot } from './note-root';
import { useNotes } from './use-notes';

export const NotesContent = () => {
  const notes = useNotes();

  return (
    <Box bg={mode('white', 'gray.800')} flex="1" pt="10" pl="5">
      {notes.currentNote.root &&
        <NoteRoot note={notes.currentNote} />
      }
      {!notes.currentNote.root &&
        <NoteTree note={notes.currentNote} noteParent={notes.currentNoteParent} />
      }
    </Box>
  )
}