import { Button } from '@chakra-ui/react';
import { useNotes } from 'feature/notes/use-notes';
import { BiUpArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const UpButton = () => {
  const notes = useNotes();

  return (
    <Link to={"" + notes.parentUrl}>
      <Button disabled={notes.parentUrl === null} leftIcon={<BiUpArrowAlt />}>Up</Button>
    </Link>

  )
}