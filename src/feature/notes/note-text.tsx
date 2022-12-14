import classNames from 'classnames';
import { useState } from 'react';
import NoteEditable from './note-editable';
import { Note, useNotes } from './use-notes';

interface NoteTextProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteText = ({ note, noteParent }: NoteTextProps) => {
  const notes = useNotes();
  const [html, setHtml] = useState(note.text || "Note");

  const onKeyDown = (e: any) => {

    // add a new note on key down
    if (e.code === 'Enter') {
      e.preventDefault();
      notes.onAdd(noteParent || notes.rootNote);
    }

    // add a new note on key down
    if (!e.shiftKey && e.code === 'Tab') {
      e.preventDefault();
      notes.onAdd(note);
    }
  };

  const editable =
    <NoteEditable
      tagName='span'
      spellCheck="false"
      className={classNames({
        completed: note.completed,
        link: !!note.link
      })}
      html={html}
      disabled={note.locked || !!note.link}
      onKeyDown={(e: any) => onKeyDown(e)}
      onBlur={() => notes.onUpdate({ ...note, text: html })}
      onChange={(e: any) => setHtml(e.target.value)}
      onInput={undefined}
      onKeyPress={undefined}
    />;

  return (
    <>

      {!!note.link &&
        <a href={note.link} target="#blank">
          {editable}
        </a>
      }

      {!note.link && editable}
    </>

  );
}