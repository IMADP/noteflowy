import classNames from 'classnames';
import { useRef } from 'react';
import ContentEditable from "react-contenteditable";
import { Note, useNotes } from './use-notes';

interface NoteDetailsProps {
  note: Note;
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {
  const notes = useNotes();
  const text = useRef('');
  text.current = note.details || "Details";

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
          html={text.current}
          disabled={note.locked}
          onBlur={() => notes.onUpdate({ ...note, details: text.current })}
          onChange={(e) => { text.current = e.target.value }}
        />
      }
    </>

  );
}