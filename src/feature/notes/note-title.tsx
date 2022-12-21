import { Text } from '@chakra-ui/react';
import { Note } from './use-notes';

interface NoteTitleProps {
  note: Note;
}

export const NoteTitle = ({ note }: NoteTitleProps) => {
  
  return (
    <Text style={{ fontWeight: 600 }}>
      {note.title}
    </Text>
  )
}