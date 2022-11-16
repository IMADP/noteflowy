import React, { useRef } from 'react';
import NoteMenu from './NoteMenu';
import Editable from '../global/Editable';
import Details from '../details/Details';
import './Note.css';

function Note({ note, onAdd, onUpdate, onDelete }) {
    const inputRef = useRef();
    const showDetailEdit = false;

    return (
        <div className="Note">
            <NoteMenu note={note} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} />
            <Editable
                text={note.text}
                childRef={inputRef}
                type="input"
            >
                <input
                    ref={inputRef}
                    type="text"
                    name="task"
                    value={note.text}
                    onChange={(e) => onUpdate({...note, text: e.target.value})}
                />
            </Editable>
            {note.details !== null && <Details details={note.details} inEditMode={showDetailEdit} />}
        </div>
    );
}

export default Note;
