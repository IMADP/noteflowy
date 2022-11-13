import NoteMenu from "./NoteMenu";
import Editable from "../global/Editable";

function Note({ note, onAdd, onUpdate, onDelete }) {
    return (
        <div>
            <span style={{marginRight: '10px'}}>
                <NoteMenu note={note} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} />
            </span>
            <span >
                <Editable
                    text={note.text}
                    placeholder="Click to Edit"
                    type="input"
                    >
                    <input
                        type="text"
                        name="task"
                        placeholder="Click to Edit"
                        value={note.text}
                        onChange={(e) => onUpdate({...note, text: e.target.value})}
                    />
                    </Editable>
            </span>
        </div>
    );
}

export default Note;
