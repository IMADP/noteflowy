import classNames from 'classnames';
import React from 'react';
import ContentEditable from "react-contenteditable";

function NoteDetails({ note, noteActions }) {

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
                    html={note.details}
                    disabled={note.locked}
                    onChange={(e) => noteActions.onUpdate({ ...note, details: e.target.value })}
                />
            }
        </>

    );
}

export default NoteDetails;
