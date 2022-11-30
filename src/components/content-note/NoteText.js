import classNames from 'classnames';
import React from 'react';
import ContentEditable from "react-contenteditable";

function NoteText({ note, parent, noteActions }) {

    const onKeyDown = (e) => {
        // add a new note on key down
        if (e.code === 'Enter') {
            e.preventDefault();
            noteActions.onAdd(parent);
        }
    };

    const editable = <ContentEditable
        tagName='span'
        spellCheck="false"
        className={classNames({
            completed: note.completed,
            locked: note.locked
        })}
        html={note.text}
        disabled={note.locked}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={(e) => noteActions.onUpdate({ ...note, text: e.target.value })}
    />;

    return (
        <>
            {note.link &&
                <a href={note.link} target="#blank">
                    {editable}
                </a>
            }

            {!note.link && editable }
        </>

    );
}

export default NoteText;
