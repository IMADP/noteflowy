import React, { useRef } from "react";
import NoteMenu from "./NoteMenu";
import Editable from "../global/Editable";

function Note({ note, onAdd, onUpdate, onDelete }) {
    const inputRef = useRef();

    return (
        <div>
            <span style={{marginRight: '10px'}}>
                <NoteMenu note={note} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} />
            </span>
            <span >
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
            </span>
        </div>
    );
}

export default Note;
