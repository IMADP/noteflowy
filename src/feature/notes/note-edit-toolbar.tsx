import { IconButton, Stack, Tooltip } from '@chakra-ui/react';

import { BiArrowFromLeft, BiArrowFromTop, BiCopyAlt, BiEraser } from 'react-icons/bi';
import { Note, useNotes } from './use-notes';

interface NoteEditToolbarProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteEditToolbar = ({ note, noteParent }: NoteEditToolbarProps) => {
  const notes = useNotes();

  return (

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
  )
}