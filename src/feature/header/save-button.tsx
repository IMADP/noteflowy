import { Button } from '@chakra-ui/react';
import { useNotes } from 'feature/notes/use-notes';
import { BiSave } from 'react-icons/bi';

export const SaveButton = () => {
  const notes = useNotes();

  const onClick = () => {
    notes.onSave();
  };

  return (
    <Button
      color='tomato'
      onClick={onClick}
      leftIcon={<BiSave />}>
      Save
    </Button>
  )
}