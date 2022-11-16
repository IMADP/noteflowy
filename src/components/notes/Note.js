import React, { useRef } from "react";
import NoteMenu from "./NoteMenu";
import Editable from "../global/Editable";
import "./Note.css";

function Note({ note, onAdd, onUpdate, onDelete }) {
    const inputRef = useRef();

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
        </div>
    );
}

export default Note;
