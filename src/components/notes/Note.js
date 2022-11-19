import React, { useRef, useState } from 'react';
import NoteMenu from './NoteMenu';
import Editable from '../global/Editable';
import Details from '../details/Details';
import './Note.css';

function Note({ note, parent, onAdd, onAddSubNote, onDuplicate, onUpdate, onDelete }) {
    const inputRef = useRef();
    const [showDetailEdit, setShowDetailEdit] = useState(false);

    const handleDetailUpdate = (e) => {
        onUpdate({ ...note, details: e.target.value })
        setShowDetailEdit(false);
    }

    return (
        <div className="Note">
            <NoteMenu
                note={note}
                parent={parent}
                onAdd={onAdd}
                onAddSubNote={onAddSubNote}
                onDuplicate={onDuplicate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                handleAddDetails={() => setShowDetailEdit(true)}
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
            
            {(showDetailEdit || note.details) &&
                <Details
                    details={note.details}
                    initialEditing={showDetailEdit}
                    onChange={handleDetailUpdate}
                    onClickOutside={() => setShowDetailEdit(false)}
                />
            }

            <ul>
            {note.children.map((n) => (
                <li key={n.id}>
                    <Note note={n} parent={note} onAdd={onAdd} onAddSubNote={onAddSubNote} onDuplicate={onDuplicate} onUpdate={onUpdate} onDelete={onDelete} />
                </li>
            ))}
            </ul>

        </div>
    );
}

export default Note;
