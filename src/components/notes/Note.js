import NoteMenu from "./NoteMenu";

function Note({ note, onAdd, onDelete }) {
    return (
        <div>
            <span style={{marginRight: '10px'}}>
                <NoteMenu note={note} onAdd={onAdd} onDelete={onDelete} />
            </span>
            <span >
                {note.text}
            </span>
        </div>
    );
}

export default Note;
