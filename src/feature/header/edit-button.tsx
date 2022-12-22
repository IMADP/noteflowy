import { Button } from '@chakra-ui/react';
import { visitNoteTreeReverse } from 'feature/notes/note-util';
import { useNotes } from 'feature/notes/use-notes';
import { BiEditAlt, BiNotepad } from 'react-icons/bi';

export const EditButton = () => {
  const notes = useNotes();
  const edit = notes.isEdit;

  const onClick = () => {
    notes.onToggleEdit();

    // purge any empty notes (careful about children)
    visitNoteTreeReverse(notes.rootNote, (note) => {
      let hasChildrenContent = false;
     
      note.children.forEach(n => {

        visitNoteTreeReverse(n, (cn) => {
          
          if(!hasChildrenContent && !cn.content) {
            notes.onDelete(cn.id);
          } else {
            hasChildrenContent = true;
          }
          
        });
        
      });

      if(!hasChildrenContent && !note.content) {
        notes.onDelete(note.id);
      }
       
    });
    
  };

  return (
    <Button
      onClick={onClick}
      leftIcon={edit ? <BiNotepad /> : <BiEditAlt />}>
      {edit ? 'View' : 'Edit'}
    </Button>
  )
}