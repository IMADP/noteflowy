import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import { NoteTree } from './note-tree';
import { Note, useNotes } from './use-notes';

export const NotesContent = () => {
  const notes = useNotes();

  return (
    <Box bg={mode('white', 'gray.800')} flex="1" pt="5" pl="5">

      {notes.currentNote.root && notes.currentNote.children.map((n: Note) => (
        <NoteTree key={n.id} note={n} noteParent={undefined} />
      ))}

      {!notes.currentNote.root &&
        <NoteTree note={notes.currentNote} noteParent={notes.currentNoteParent} />
      }
    </Box>
  )
}