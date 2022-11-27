import classNames from 'classnames';
import React from 'react';
import ContentEditable from "react-contenteditable";

function NoteText({ note, noteActions }) {
    
    return (
        <>
            {note.link &&
                <a href={note.link} target="#blank">
                    <ContentEditable
                        style={{ display: 'inline' }}
                        tagName='span'
                        spellCheck="false"
                        className={classNames({
                            completed: note.completed,
                            locked: note.locked
                        })}
                        html={note.text}
                        disabled={note.locked}
                        onChange={(e) => noteActions.onUpdate({ ...note, text: e.target.value })}
                    />
                </a>
            }

            {!note.link &&
                <ContentEditable
                    style={{ display: 'inline' }}
                    tagName='span'
                    spellCheck="false"
                    className={classNames({
                        completed: note.completed,
                        locked: note.locked
                    })}
                    html={note.text}
                    disabled={note.locked}
                    onChange={(e) => noteActions.onUpdate({ ...note, text: e.target.value })}
                />
            }
        </>

    );
}

export default NoteText;
