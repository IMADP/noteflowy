import classNames from 'classnames';
import { useRef } from 'react';
import ContentEditable from "react-contenteditable";
import { Note, useNotes } from './use-notes';

interface NoteTextProps {
  note: Note;
  noteParent: Note | undefined;
}

export const NoteText = ({ note, noteParent }: NoteTextProps) => {
  const notes = useNotes();
  const text = useRef('');
  text.current = note.text;

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
    <ContentEditable
      tagName='span'
      spellCheck="false"
      className={classNames({
        completed: note.completed,
        locked: note.locked
      })}
      html={text.current}
      disabled={note.locked}
      onKeyDown={(e) => onKeyDown(e)}
      onBlur={() => notes.onUpdate({ ...note, text: text.current })}
      onChange={(e) => { text.current = e.target.value }}
    />;

  return (
    <>

      {note.link &&
        <a href={note.link} target="#blank">
          {editable}
        </a>
      }

      {!note.link && editable}
    </>

  );
}