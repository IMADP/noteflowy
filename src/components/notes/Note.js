import NoteMenu from "./NoteMenu";

function Note({ note, onDelete }) {
    return (
        <div>
            <span style={{marginRight: '10px'}}>
                <NoteMenu note={note} onDelete={onDelete} />
            </span>
            <span >
                {note.text} <i> - {note.id}</i>
            </span>
        </div>
    );
}

export default Note;
