import classNames from 'classnames';
import ContentEditable from "react-contenteditable";
import { Note, useNotes } from './use-notes';

interface NoteDetailsProps {
  note: Note;
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {
  const notes = useNotes();

  return (
    <>
      {note.showDetails &&
        <ContentEditable
          tagName='div'
          className={classNames({
            details: true,
            locked: note.locked
          })}
          spellCheck="false"
          html={note.details || "Details"}
          disabled={note.locked}
          onChange={(e) => notes.onUpdate({ ...note, details: e.target.value })}
        />
      }
    </>

  );
}