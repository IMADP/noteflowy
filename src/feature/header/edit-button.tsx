import { Button } from '@chakra-ui/react';
import { useNotes } from 'feature/notes/use-notes';
import { BiEditAlt, BiNotepad } from 'react-icons/bi';

export const EditButton = () => {
  const notes = useNotes();
  const edit = notes.rootNote.edit;

  return (
    <Button
      onClick={() => notes.onUpdate({ ...notes.rootNote, edit: !edit })}
      leftIcon={edit ? <BiNotepad /> : <BiEditAlt />}>
      {edit ? 'View' : 'Edit'}
    </Button>
  )
}