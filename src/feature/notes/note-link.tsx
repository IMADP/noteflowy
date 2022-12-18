import { BiRadioCircleMarked } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { Note } from './use-notes';

interface NoteLinkProps {
  note: Note;
}

export const NoteLink = ({ note }: NoteLinkProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <BiRadioCircleMarked color="gray" size="1.5rem" onClick={onClick} style={{cursor: 'pointer'}} />
  )
}