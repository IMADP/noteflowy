import classNames from 'classnames';
import { useState } from 'react';
import NoteEditable from "./note-editable";
import { Note, useNotes } from './use-notes';

interface NoteDetailsProps {
  note: Note;
}

export const NoteDetails = ({ note }: NoteDetailsProps) => {
  const notes = useNotes();
  const [html, setHtml] = useState(note.details || "Details");

  return (
    <>
      {note.showDetails &&
        <NoteEditable
          tagName='div'
          className={classNames({
            details: true,
            locked: note.locked
          })}
          spellCheck="false"
          html={html}
          disabled={note.locked}
          onBlur={() => notes.onUpdate({ ...note, details: html })}
          onChange={(e: any) => setHtml(e.target.value)}
          onInput={undefined}
          onKeyPress={undefined}
          onKeyDown={undefined}
        />
      }
    </>

  );
}