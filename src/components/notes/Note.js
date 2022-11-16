import React, { useRef, useState } from 'react';
import NoteMenu from './NoteMenu';
import Editable from '../global/Editable';
import Details from '../details/Details';
import './Note.css';

function Note({ note, onAdd, onUpdate, onDelete }) {
    const inputRef = useRef();
    const [showDetailEdit, setShowDetailEdit] = useState(false);

    const handleAddDetails = () => setShowDetailEdit(true);

    return (
        <div className="Note">
            <NoteMenu
                note={note}
                onAdd={onAdd}
                onUpdate={onUpdate}
                onDelete={onDelete}
                handleAddDetails={handleAddDetails}
            />
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
            {(showDetailEdit || note.details !== null) && <Details details={note.details} inEditMode={showDetailEdit} />}
        </div>
    );
}

export default Note;
