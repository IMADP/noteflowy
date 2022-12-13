import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import { NotesTree } from './notes-tree';
import { NotesTreeRoot } from './notes-tree-root';
import { useNotes } from './use-notes';

export const NotesContent = () => {
  const notes = useNotes();

  return (
    <Box bg={mode('white', 'gray.800')} flex="1" pt="10" pl="5">
      {notes.currentNote.root &&
        <NotesTreeRoot note={notes.currentNote} noteParent={notes.currentNote} />
      }
      {!notes.currentNote.root &&
        <NotesTree note={notes.currentNote} noteParent={notes.currentNoteParent} />
      }
    </Box>
  )
}