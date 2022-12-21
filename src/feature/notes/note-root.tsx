import { Box, IconButton, List, ListItem, Tooltip, useColorModeValue as mode } from '@chakra-ui/react';
import { BiPlusMedical } from 'react-icons/bi';
import { NoteTree } from './note-tree';
import { Note, useNotes } from './use-notes';

export const NoteRoot = () => {
  const notes = useNotes();

  return (
    <Box bg={mode('white', 'gray.800')} flex="1" py="5" pl="5">

      {notes.currentNote.root && notes.currentNote.children.map((n: Note) => (
        <NoteTree key={n.id} note={n} noteParent={undefined} />
      ))}

      {!notes.currentNote.root &&
        <NoteTree note={notes.currentNote} noteParent={notes.currentNoteParent} />
      }

      {notes.isEdit &&
        <List ml={5} mt={5}>
          <ListItem>

            <Tooltip hasArrow label='Add Note'>
              <IconButton
                size='sm'
                variant='outline'
                color='gray'
                aria-label='Add a note'
                onClick={() => notes.onAdd(notes.currentNote)}
                icon={<BiPlusMedical />}
              />
            </Tooltip>

          </ListItem>
        </List>
      }
    </Box>
  )
}