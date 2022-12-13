import classNames from 'classnames';
import ContentEditable from "react-contenteditable";
import { Note, useNotes } from './use-notes';

interface NoteTextProps {
  note: Note;
}

export const NoteText = ({ note }: NoteTextProps) => {
  const notes = useNotes();

  const onKeyDown = (e: any) => {

    // add a new note on key down
    if (e.code === 'Enter') {
      e.preventDefault();
      notes.onAdd(notes.currentNoteParent || notes.rootNote);
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
      html={note.text}
      disabled={note.locked}
      onKeyDown={(e) => onKeyDown(e)}
      onChange={(e) => notes.onUpdate({ ...note, text: e.target.value })}
    />
    ;

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