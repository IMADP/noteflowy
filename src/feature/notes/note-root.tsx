import { Box, IconButton, List, ListItem, Tooltip, useColorModeValue as mode } from '@chakra-ui/react';
import { BiPlusMedical } from 'react-icons/bi';
import { NoteTree } from './note-tree';
import { NoteTreeEdit } from './note-tree-edit';
import { Note, useNotes } from './use-notes';

/**
 * NoteRoot is responsible for rendering the NoteTree, but there are some minor
 * differences depending on whether the current note is the invisible root note or not.
 * 
 * For example, the root note only renders children while non-root notes render themselves
 * and their children.
 * 
 * There are also different components to render if the app is in edit mode or not, 
 * so unfortunately there are 4 separate conditions to consider.
 * 
 * @returns 
 */
export const NoteRoot = () => {
  const notes = useNotes();

  return (
    <Box bg={mode('white', 'gray.800')} flex="1" py="5" pl="5">

      {!notes.isEdit &&
        <>
          {notes.currentNote.root && notes.currentNote.children.map((n: Note) => (
            <NoteTree key={n.id} note={n} />
          ))}

          {!notes.currentNote.root &&
            <NoteTree note={notes.currentNote} />
          }
        </>
      }
      
      {notes.isEdit &&
        <>
          {notes.currentNote.root && notes.currentNote.children.map((n: Note) => (
            <NoteTreeEdit key={n.id} note={n} noteParent={undefined} />
          ))}

          {!notes.currentNote.root &&
            <NoteTreeEdit note={notes.currentNote} noteParent={notes.currentNoteParent} />
          }
        </>
      }

      {notes.isEdit &&
        <List ml={4} mt={5}>
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